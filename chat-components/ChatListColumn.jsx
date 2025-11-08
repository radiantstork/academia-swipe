// fileName: ChatListColumn.jsx (FINAL COMPLETE CODE)
"use client";
import React from 'react';

// --- MOCK CONVERSATION DATA ---
const messagesAlice = [
  { id: 1, user: 'Alice Johnson', text: 'Hi! I saw your project files. Looks like a solid architecture.', timestamp: '10:05 AM' },
  { id: 2, user: 'You', text: 'Thanks! I focused on clean modularity. Did you see the database schema?', timestamp: '10:07 AM' },
  { id: 3, user: 'Alice Johnson', text: 'Yes, the normalization is perfect. Let\'s meet tomorrow at 10 AM to discuss deployment.', timestamp: '10:15 AM' },
];

const messagesBob = [
  { id: 1, user: 'Bob Smith', text: 'Hey, did you get the files I sent over? Need a review on the YAML configs.', timestamp: 'Yesterday' },
  { id: 2, user: 'You', text: 'Not yet, checking now. Are these for the staging environment?', timestamp: 'Yesterday' },
  { id: 3, user: 'Bob Smith', text: 'Affirmative. The memory allocation needs tuning.', timestamp: 'Yesterday' },
];

const messagesCharlie = [
  { id: 1, user: 'You', text: 'The new design looks fantastic! The neon pink really pops.', timestamp: '4:20 PM' },
  { id: 2, user: 'Charlie Brown', text: 'Thanks! It\'s running on a custom shader model. Check the GPU utilization on your end.', timestamp: '4:21 PM' },
];

// Central Conversation Store: Maps chatId to message array
export const mockConversations = {
    1: messagesAlice,
    2: messagesBob,
    3: messagesCharlie,
    4: [{ id: 1, user: 'Diana Prince', text: 'The confirmation is ready. I\'ll send it shortly.', timestamp: '11:00 AM' }],
    5: [{ id: 1, user: 'Ethan Hunt', text: 'Mission status: Package secured.', timestamp: '09:00 AM' }],
    6: [{ id: 1, user: 'Fiona Glenn', text: 'I\'m free tomorrow. Ready for the deep dive.', timestamp: '11:30 AM' }],
    7: [{ id: 1, user: 'George K', text: 'PR merged. Build status: Green.', timestamp: '12:00 PM' }],
    8: [{ id: 1, user: 'Hannah O\'Malley', text: 'Received the final report. Looks flawless.', timestamp: '01:00 PM' }],
};

// --- Chat List (used for the left column) ---
const mockChats = [
  { id: 1, user: { name: 'Alice Johnson' }, lastMessage: mockConversations[1][mockConversations[1].length - 1].text, unreadCount: 2, isActive: true },
  { id: 2, user: { name: 'Bob Smith' }, lastMessage: mockConversations[2][mockConversations[2].length - 1].text, unreadCount: 0, isActive: false },
  { id: 3, user: { name: 'Charlie Brown' }, lastMessage: mockConversations[3][mockConversations[3].length - 1].text, unreadCount: 5, isActive: false },
  { id: 4, user: { name: 'Diana Prince' }, lastMessage: mockConversations[4][mockConversations[4].length - 1].text, unreadCount: 0, isActive: false },
  { id: 5, user: { name: 'Ethan Hunt' }, lastMessage: mockConversations[5][mockConversations[5].length - 1].text, unreadCount: 1, isActive: false },
  { id: 6, user: { name: 'Fiona Glenn' }, lastMessage: mockConversations[6][mockConversations[6].length - 1].text, unreadCount: 0, isActive: false },
  { id: 7, user: { name: 'George K' }, lastMessage: mockConversations[7][mockConversations[7].length - 1].text, unreadCount: 3, isActive: false },
  { id: 8, user: { name: 'Hannah O\'Malley' }, lastMessage: mockConversations[8][mockConversations[8].length - 1].text, unreadCount: 0, isActive: false },
];
export { mockChats }; 


/**
 * ChatListItem Component (Internal component)
 */
const ChatListItem = ({ chat, isActive, onClick }) => {
  return (
    <div
      onClick={() => onClick(chat.id)}
      className={`
        flex items-center p-3 cursor-pointer transition duration-200 ease-in-out
        border-b border-gray-900/10 dark:border-gray-800
        
        ${isActive 
            ? 'bg-fuchsia-900/20 dark:bg-gray-700/50 border-l-4 border-fuchsia-400 font-bold' 
            : 'bg-white dark:bg-gray-900 hover:bg-fuchsia-900/10'
        }
        
        ${!isActive && 'hover:shadow-lg hover:shadow-fuchsia-800/20'} 
      `}
    >
      {/* Avatar Placeholder */}
      <div className="flex-shrink-0 mr-4">
        <div className="w-11 h-11 rounded-full bg-rose-500 flex items-center justify-center text-gray-900 font-extrabold text-xl shadow-xl shadow-rose-700/30">
          {chat.user.name.charAt(0)}
        </div>
      </div>

      {/* Text Content: Name and Last Message */}
      <div className="flex-grow min-w-0 pr-2">
        <p className={`text-base truncate ${isActive ? 'text-fuchsia-400 dark:text-fuchsia-400' : 'text-gray-900 dark:text-gray-50 font-semibold'}`}>
          {chat.user.name}
        </p>
        <p className="text-sm text-gray-500 truncate dark:text-gray-400 font-mono">
          {chat.lastMessage}
        </p>
      </div>

      {/* Unread Message Count Badge */}
      {chat.unreadCount > 0 && (
        <div className="ml-auto flex-shrink-0">
          <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 text-xs font-extrabold leading-none text-white bg-rose-500 rounded-full shadow-lg shadow-rose-600/50 animate-pulse">
            {chat.unreadCount}
          </span>
        </div>
      )}
    </div>
  );
};


/**
 * ChatListColumn Component (The mobile-optimized column)
 */
export const ChatListColumn = ({ chats, activeChatId, onSelectChat }) => {
  return (
    <div 
      className="
        w-full h-full flex flex-col 
        bg-gray-900 dark:bg-gray-900 border-r md:border-r-0 border-gray-800
      "
    >
      {/* Header */}
      <header className="p-4 border-b border-gray-800 flex justify-between items-center flex-shrink-0">
        <h2 className="text-2xl font-extrabold text-fuchsia-400 font-mono">TERMINAL_MSG_LOG</h2>
        <button className="text-gray-400 hover:text-rose-400 p-1 transition duration-150 hover:shadow-md hover:shadow-rose-800/50 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </button>
      </header>

      {/* Search Bar Placeholder */}
      <div className="p-4 flex-shrink-0">
          <input 
              type="text" 
              placeholder="QUERY CHATS..." 
              className="w-full p-2.5 text-sm border-2 border-gray-700 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 bg-gray-800/70 text-white font-mono"
          />
      </div>

      {/* Chat List Body - SCROLLABLE SECTION */}
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        {chats.map(chat => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isActive={chat.id === activeChatId}
            onClick={onSelectChat} 
          />
        ))}
        <div className="p-10 text-center text-gray-700 dark:text-gray-700 text-sm font-mono">
            // STATUS: IDLE
        </div>
      </div>
    </div>
  );
};