import React, { useState, useEffect, useRef } from 'react';
import { Mail, User, Calendar, MessageSquare, Trash2, Reply, Eye, EyeOff, Search, Filter, Download, Upload, BarChart3 } from 'lucide-react';
import { getContactMessages, saveContactMessages, exportContactMessagesToJSON, importContactMessagesFromJSON, clearAllContactMessages, getContactMessagesStats, ContactMessage } from '../utils/contactUtils';



interface ContactManagerProps {
  onDataChange: (hasChanges: boolean) => void;
}

const ContactManager: React.FC<ContactManagerProps> = ({ onDataChange }) => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all');
  const [saveMessage, setSaveMessage] = useState('');
  const [stats, setStats] = useState(getContactMessagesStats());
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load messages from localStorage
  useEffect(() => {
    const loadedMessages = getContactMessages();
    setMessages(loadedMessages);
    setStats(getContactMessagesStats());
  }, []);

  // Save messages to localStorage
  const saveMessages = (updatedMessages: ContactMessage[]) => {
    setMessages(updatedMessages);
    saveContactMessages(updatedMessages);
    setStats(getContactMessagesStats());
    onDataChange(true);
    
    setSaveMessage('Messages updated successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  // Mark message as read/unread
  const toggleReadStatus = (messageId: string) => {
    const updatedMessages = messages.map(msg =>
      msg.id === messageId ? { ...msg, isRead: !msg.isRead } : msg
    );
    saveMessages(updatedMessages);
  };

  // Delete message
  const deleteMessage = (messageId: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      const updatedMessages = messages.filter(msg => msg.id !== messageId);
      saveMessages(updatedMessages);
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    }
  };

  // Reply to message (opens email client)
  const replyToMessage = (message: ContactMessage) => {
    const subject = `Re: ${message.subject}`;
    const body = `Hi ${message.name},\n\nThank you for your message. \n\n---\nOriginal message:\n${message.message}`;
    window.open(`mailto:${message.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  // Filter messages
  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = 
      filterStatus === 'all' ||
      (filterStatus === 'read' && message.isRead) ||
      (filterStatus === 'unread' && !message.isRead);

    return matchesSearch && matchesFilter;
  });

  // Add sample data for demo
  const addSampleData = () => {
    const sampleMessages: ContactMessage[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Project Inquiry',
        message: 'Hi Viet, I would like to discuss a potential project collaboration. Could we schedule a call?',
        timestamp: Date.now() - 86400000, // 1 day ago
        isRead: false,
        isStarred: false
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@company.com',
        subject: 'Job Opportunity',
        message: 'Hello, we have an exciting fullstack developer position that might interest you. Please let me know if you would like to learn more.',
        timestamp: Date.now() - 172800000, // 2 days ago
        isRead: true,
        isStarred: true
      },
      {
        id: '3',
        name: 'Mike Chen',
        email: 'mike@startup.io',
        subject: 'Technical Question',
        message: 'I saw your portfolio and was impressed by your .NET Core projects. I have a technical question about microservices architecture.',
        timestamp: Date.now() - 259200000, // 3 days ago
        isRead: false,
        isStarred: false
      }
    ];
    
    const updatedMessages = [...messages, ...sampleMessages];
    saveMessages(updatedMessages);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle file import
  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedMessages = await importContactMessagesFromJSON(file);
      
      // Merge with existing messages (avoid duplicates by ID)
      const existingIds = new Set(messages.map(msg => msg.id));
      const newMessages = importedMessages.filter(msg => !existingIds.has(msg.id));
      
      const mergedMessages = [...messages, ...newMessages].sort((a, b) => b.timestamp - a.timestamp);
      saveMessages(mergedMessages);
      
      setSaveMessage(`Successfully imported ${newMessages.length} new messages!`);
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage(`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setTimeout(() => setSaveMessage(''), 5000);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Contact Messages</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Manage and respond to contact form submissions ({unreadCount} unread)
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {messages.length === 0 && (
            <button
              onClick={addSampleData}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              Add Sample Data
            </button>
          )}
          
          {messages.length > 0 && (
            <>
              <button
                onClick={exportContactMessagesToJSON}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Export JSON
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4" />
                Import JSON
              </button>
              
              <button
                onClick={clearAllContactMessages}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileImport}
        className="hidden"
      />

      {/* Success Message */}
      {saveMessage && (
        <div className={`border rounded-xl p-4 ${
          saveMessage.includes('failed') || saveMessage.includes('Import failed')
            ? 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
        }`}>
          {saveMessage}
        </div>
      )}

      {/* Statistics Cards */}
      {messages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Messages</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Eye className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.unread}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Unread</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.today}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Today</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.thisWeek}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">This Week</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'unread' | 'read')}
            className="pl-10 pr-8 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {/* Messages Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Messages ({filteredMessages.length})
          </h3>
          
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Mail className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">
                {messages.length === 0 ? 'No messages yet' : 'No messages match your search'}
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedMessage?.id === message.id
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                  } ${!message.isRead ? 'border-l-4 border-l-blue-500' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className={`font-medium ${!message.isRead ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-700 dark:text-slate-300'}`}>
                        {message.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleReadStatus(message.id);
                        }}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                      >
                        {message.isRead ? (
                          <EyeOff className="w-4 h-4 text-slate-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-blue-500" />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMessage(message.id);
                        }}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    {message.email}
                  </div>
                  
                  <div className={`font-medium mb-2 ${!message.isRead ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    {message.subject}
                  </div>
                  
                  <div className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {message.message}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
                    <Calendar className="w-3 h-3" />
                    {formatDate(message.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            Message Detail
          </h3>
          
          {selectedMessage ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {selectedMessage.subject}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <User className="w-4 h-4" />
                    <span>{selectedMessage.name}</span>
                    <span>•</span>
                    <span>{selectedMessage.email}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleReadStatus(selectedMessage.id)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                  >
                    {selectedMessage.isRead ? (
                      <EyeOff className="w-4 h-4 text-slate-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-blue-500" />
                    )}
                  </button>
                  <button
                    onClick={() => replyToMessage(selectedMessage)}
                    className="p-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 rounded-lg text-emerald-600"
                  >
                    <Reply className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                <Calendar className="w-4 h-4" />
                {formatDate(selectedMessage.timestamp)}
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Message</span>
                </div>
                <div className="text-slate-900 dark:text-white whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
              
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => replyToMessage(selectedMessage)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                >
                  <Reply className="w-4 h-4" />
                  Reply
                </button>
                <button
                  onClick={() => toggleReadStatus(selectedMessage.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  {selectedMessage.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  Mark as {selectedMessage.isRead ? 'Unread' : 'Read'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center">
              <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">
                Select a message to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactManager;