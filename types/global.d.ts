// Global type definitions for the portfolio project

// Browser-compatible timeout type
declare global {
  type TimeoutId = number;
  
  // Custom event types for analytics
  interface WindowEventMap {
    'analyticsUpdate': CustomEvent<any>;
    'portfolioDataUpdate': CustomEvent<any>;
  }
}

export {};