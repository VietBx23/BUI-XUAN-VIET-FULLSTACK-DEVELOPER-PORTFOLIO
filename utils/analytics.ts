// Analytics utility for tracking website visits
export interface VisitData {
  id: string;
  timestamp: number;
  date: string;
  userAgent: string;
  referrer: string;
  page: string;
  sessionId: string;
  country?: string;
  city?: string;
  device: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
}

export interface AnalyticsStats {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  weeklyVisits: number;
  monthlyVisits: number;
  averageSessionDuration: number;
  topPages: { page: string; visits: number }[];
  topReferrers: { referrer: string; visits: number }[];
  deviceStats: { desktop: number; mobile: number; tablet: number };
  browserStats: { [key: string]: number };
  visitHistory: { date: string; visits: number }[];
}

class Analytics {
  private storageKey = 'portfolio_analytics';
  private sessionKey = 'portfolio_session';

  constructor() {
    this.initSession();
  }

  private initSession() {
    if (typeof window === 'undefined') return;
    
    let sessionId = sessionStorage.getItem(this.sessionKey);
    if (!sessionId) {
      sessionId = this.generateId();
      sessionStorage.setItem(this.sessionKey, sessionId);
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
    if (typeof window === 'undefined') return 'desktop';
    
    const userAgent = navigator.userAgent.toLowerCase();
    if (/tablet|ipad|playbook|silk/.test(userAgent)) return 'tablet';
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/.test(userAgent)) return 'mobile';
    return 'desktop';
  }

  private getBrowser(): string {
    if (typeof window === 'undefined') return 'Unknown';
    
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';
    return 'Other';
  }

  private getOS(): string {
    if (typeof window === 'undefined') return 'Unknown';
    
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Other';
  }

  private getStoredData(): VisitData[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveData(visits: VisitData[]) {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(visits));
    } catch (error) {
      console.warn('Failed to save analytics data:', error);
    }
  }

  trackVisit(page: string = window.location.pathname) {
    if (typeof window === 'undefined') return;

    const sessionId = sessionStorage.getItem(this.sessionKey) || this.generateId();
    const now = new Date();
    
    const visitData: VisitData = {
      id: this.generateId(),
      timestamp: now.getTime(),
      date: now.toISOString().split('T')[0],
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'Direct',
      page,
      sessionId,
      device: this.getDeviceType(),
      browser: this.getBrowser(),
      os: this.getOS()
    };

    const visits = this.getStoredData();
    visits.push(visitData);

    // Keep only last 1000 visits to prevent storage bloat
    if (visits.length > 1000) {
      visits.splice(0, visits.length - 1000);
    }

    this.saveData(visits);

    // Dispatch event for real-time updates
    window.dispatchEvent(new CustomEvent('analyticsUpdate', { detail: visitData }));
  }

  getStats(): AnalyticsStats {
    const visits = this.getStoredData();
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Basic stats
    const totalVisits = visits.length;
    const uniqueVisitors = new Set(visits.map(v => v.sessionId)).size;
    const todayVisits = visits.filter(v => v.date === today).length;
    const weeklyVisits = visits.filter(v => v.date >= weekAgo).length;
    const monthlyVisits = visits.filter(v => v.date >= monthAgo).length;

    // Top pages
    const pageCount: { [key: string]: number } = {};
    visits.forEach(v => {
      pageCount[v.page] = (pageCount[v.page] || 0) + 1;
    });
    const topPages = Object.entries(pageCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([page, visits]) => ({ page, visits }));

    // Top referrers
    const referrerCount: { [key: string]: number } = {};
    visits.forEach(v => {
      const referrer = v.referrer === 'Direct' ? 'Direct' : new URL(v.referrer || 'Direct').hostname || 'Direct';
      referrerCount[referrer] = (referrerCount[referrer] || 0) + 1;
    });
    const topReferrers = Object.entries(referrerCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([referrer, visits]) => ({ referrer, visits }));

    // Device stats
    const deviceStats = visits.reduce((acc, v) => {
      acc[v.device]++;
      return acc;
    }, { desktop: 0, mobile: 0, tablet: 0 });

    // Browser stats
    const browserStats: { [key: string]: number } = {};
    visits.forEach(v => {
      browserStats[v.browser] = (browserStats[v.browser] || 0) + 1;
    });

    // Visit history (last 30 days)
    const visitHistory: { date: string; visits: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const dayVisits = visits.filter(v => v.date === date).length;
      visitHistory.push({ date, visits: dayVisits });
    }

    return {
      totalVisits,
      uniqueVisitors,
      todayVisits,
      weeklyVisits,
      monthlyVisits,
      averageSessionDuration: 0, // Would need session tracking for this
      topPages,
      topReferrers,
      deviceStats,
      browserStats,
      visitHistory
    };
  }

  getRecentVisits(limit: number = 10): VisitData[] {
    const visits = this.getStoredData();
    return visits
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  clearData() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.storageKey);
  }
}

export const analytics = new Analytics();

// Auto-track page visits
if (typeof window !== 'undefined') {
  // Track initial page load
  analytics.trackVisit();
  
  // Track navigation changes (for SPAs)
  let currentPath = window.location.pathname;
  const observer = new MutationObserver(() => {
    if (window.location.pathname !== currentPath) {
      currentPath = window.location.pathname;
      analytics.trackVisit(currentPath);
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
}