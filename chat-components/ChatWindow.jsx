// fileName: ChatWindow.jsx (FINAL COMPLETE CODE)
import React, { useState, useEffect, useRef } from 'react';

// --- MOCK DATA ---
const mockCurrentUserName = 'You';

/**
 * The only mock object needed for internal state typing
 */
const mockMessageExample = { id: 0, user: 'System', text: 'Initializing...', timestamp: '0:00 AM' };


/**
 * Animated Typing Indicator Component (Fuchsia)
 */
const TypingIndicator = ({ userName }) => (
    <div className="flex items-center text-fuchsia-400 font-mono text-sm">
        <span className="mr-2">&gt; {userName} is processing</span>
        {/* Animated Dots */}
        <span className="flex space-x-1">
            <span className="w-1 h-1 bg-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-1 h-1 bg-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
            <span className="w-1 h-1 bg-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
        </span>
    </div>
);


/**
 * Single Message Bubble Component (Neon Pink/Red Style Update)
 */
const MessageBubble = ({ message, isCurrentUser }) => {
  const alignClass = isCurrentUser ? 'justify-end' : 'justify-start';
  
  const bubbleClass = isCurrentUser
    ? 'bg-fuchsia-600 text-white rounded-br-none shadow-xl shadow-fuchsia-900/50' 
    : 'bg-gray-800/70 text-gray-50 rounded-tl-none border border-gray-700';
  
  const nameColorClass = isCurrentUser ? 'text-fuchsia-500' : 'text-rose-400'; 

  return (
    <div className={`flex ${alignClass} mb-4`}>
      <div className={`max-w-xs md:max-w-md lg:max-w-lg`}>
        {!isCurrentUser && (
            <p className={`text-xs ${nameColorClass} font-mono font-semibold mb-1`}>&gt; {message.user}</p>
        )}
        
        <div className={`p-3 rounded-xl shadow transition duration-200 ease-in-out ${bubbleClass}`}>
          <p className="text-sm">{message.text}</p>
          <span className={`block text-right mt-1 text-xs font-mono ${isCurrentUser ? 'text-fuchsia-200' : 'text-gray-500'}`}>
            {message.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};


/**
 * The main Chat Window Component
 * @param {{id: number, name: string}} user - The currently viewed user's data (REQUIRED).
 * @param {string} [currentUserName='You'] - The name of the local user.
 * @param {Array<Object>} [initialMessages=[]] - The conversation history.
 */
function ChatWindow({ user, currentUserName = mockCurrentUserName, initialMessages = [] }) {
  
  // Uses initialMessages from props, updates state when a new user is selected
  const [messages, setMessages] = useState(initialMessages.length > 0 ? initialMessages : [mockMessageExample]); 
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Crucial: Update state when initialMessages (from a new user selection) changes
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]); 
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      user: currentUserName,
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate other user typing/responding
    setTimeout(() => {
        setIsTyping(false); 
    }, 2500);
  };
    
  // --- RENDERING ---
  return (
    <div 
      className="
        w-full h-screen flex flex-col 
        bg-gray-900 
      "
    >
      {/* Header with User Info */}
      <header className="p-4 border-b border-gray-800 flex items-center flex-shrink-0">
        <div className="flex-shrink-0 mr-3">
          <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-gray-900 font-extrabold text-xl shadow-md shadow-rose-700/50">
            {user.name.charAt(0)}
          </div>
        </div>
        <div className="flex-grow">
            {/* Conditional Rendering for Typing Status */}
            {isTyping ? (
                <TypingIndicator userName={user.name} />
            ) : (
                <>
                  <h2 className="text-lg font-extrabold text-white truncate font-mono">{user.name}</h2>
                  <p className="text-sm text-fuchsia-500 dark:text-fuchsia-400 font-mono flex items-center">
                    <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
                    </span>
                    STATUS: ACTIVE
                  </p>
                </>
            )}
        </div>
        <button className="ml-auto text-gray-500 hover:text-rose-500 dark:text-gray-400 dark:hover:text-rose-400 p-1 transition hover:shadow-md hover:shadow-rose-800/50 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.08 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </button>
      </header>

      {/* Message Body - SCROLLABLE SECTION */}
      <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id || index}
            message={message}
            isCurrentUser={message.user === currentUserName}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <footer className="p-4 border-t border-gray-800 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="ENTER COMMAND..."
            className="flex-grow p-3 border-2 border-gray-700 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 bg-gray-800/70 text-white text-sm font-mono"
          />
          <button
            type="submit"
            className="flex-shrink-0 w-10 h-10 bg-rose-500 text-gray-900 font-extrabold rounded-lg flex items-center justify-center hover:bg-rose-400 transition duration-150 disabled:bg-rose-900 shadow-lg hover:shadow-rose-600/50"
            disabled={inputMessage.trim() === ''}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M15 15l-6-6"/></svg>
          </button>
        </form>
      </footer>
    </div>
  );
}

export default ChatWindow;