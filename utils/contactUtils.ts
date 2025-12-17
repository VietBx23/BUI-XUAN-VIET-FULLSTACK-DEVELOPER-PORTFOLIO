// Utility functions for contact message management

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: number;
  isRead: boolean;
  isStarred: boolean;
}

// Lấy tất cả contact messages từ localStorage
export const getContactMessages = (): ContactMessage[] => {
  try {
    const messages = localStorage.getItem('portfolio_contact_messages');
    return messages ? JSON.parse(messages) : [];
  } catch (error) {
    console.error('Error loading contact messages:', error);
    return [];
  }
};

// Lưu contact messages vào localStorage
export const saveContactMessages = (messages: ContactMessage[]): void => {
  try {
    localStorage.setItem('portfolio_contact_messages', JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving contact messages:', error);
  }
};

// Thêm message mới
export const addContactMessage = (messageData: Omit<ContactMessage, 'id' | 'timestamp' | 'isRead' | 'isStarred'>): ContactMessage => {
  const newMessage: ContactMessage = {
    ...messageData,
    id: Date.now().toString() + Math.random().toString(36).substring(2, 11),
    timestamp: Date.now(),
    isRead: false,
    isStarred: false
  };

  const messages = getContactMessages();
  messages.unshift(newMessage);

  // Giới hạn 100 messages
  const limitedMessages = messages.slice(0, 100);
  saveContactMessages(limitedMessages);

  return newMessage;
};

// Export dữ liệu ra JSON file
export const exportContactMessagesToJSON = (): void => {
  const messages = getContactMessages();
  
  const dataStr = JSON.stringify(messages, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `contact-messages-${new Date().toISOString().split('T')[0]}.json`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

// Import dữ liệu từ JSON file
export const importContactMessagesFromJSON = (file: File): Promise<ContactMessage[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const messages: ContactMessage[] = JSON.parse(content);
        
        // Validate data structure
        if (!Array.isArray(messages)) {
          throw new Error('Invalid file format: expected array');
        }
        
        // Validate each message
        messages.forEach((msg, index) => {
          if (!msg.id || !msg.name || !msg.email || !msg.subject || !msg.message || !msg.timestamp) {
            throw new Error(`Invalid message at index ${index}: missing required fields`);
          }
        });
        
        resolve(messages);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

// Xóa tất cả messages
export const clearAllContactMessages = (): void => {
  if (confirm('Are you sure you want to delete all contact messages? This action cannot be undone.')) {
    localStorage.removeItem('portfolio_contact_messages');
  }
};

// Lấy thống kê
export const getContactMessagesStats = () => {
  const messages = getContactMessages();
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = 7 * oneDay;
  const oneMonth = 30 * oneDay;

  return {
    total: messages.length,
    unread: messages.filter(msg => !msg.isRead).length,
    starred: messages.filter(msg => msg.isStarred).length,
    today: messages.filter(msg => now - msg.timestamp < oneDay).length,
    thisWeek: messages.filter(msg => now - msg.timestamp < oneWeek).length,
    thisMonth: messages.filter(msg => now - msg.timestamp < oneMonth).length,
    oldestMessage: messages.length > 0 ? new Date(Math.min(...messages.map(msg => msg.timestamp))) : null,
    newestMessage: messages.length > 0 ? new Date(Math.max(...messages.map(msg => msg.timestamp))) : null
  };
};