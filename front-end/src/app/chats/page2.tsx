// fileName: page.tsx (FINAL TYPESCRIPT CORRECTED VERSION)
"use client";
import React, { useState, useMemo } from 'react';
// Note: We import mockConversations and ChatListColumn as separate named exports
import { ChatListColumn, mockChats, mockConversations } from '@/components/ChatListColumn'; 
import ChatWindow from '@/components/ChatWindow'; 
import { useChats } from '@/app/context/ChatContext';


// Define types for TypeScript safety
type ChatType = typeof mockChats[0];

type MessageType = {
    id: number;
    user: string;
    text: string;
    timestamp: string;
};

// Define a type for the entire mockConversations object allowing number indexing
type ConversationsMap = {
    [key: number]: MessageType[];
};

// Apply the map types:
const chatMap = mockChats.reduce((map, chat) => {
    map[chat.id] = chat;
    return map;
}, {} as { [key: number]: ChatType });

// Cast the imported mockConversations object to the safe type
const typedMockConversations = mockConversations as ConversationsMap; 


/**
 * The main component to manage state and layout for the combined chat interface.
 */
function CombinedChatApp() {
  const [activeChatId, setActiveChatId] = useState<null | string>(null);
  const [isListView, setIsListView] = useState(true);
  const { chats } = useChats();
  

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setIsListView(false); 
  };
    
//   // LOOKUP: Get the message history for the active chat
//   const activeMessages = useMemo(() => {
//       // Use the safely typed constant for indexing
//       return typedMockConversations[activeChatId] || []; 
//   }, [activeChatId]);


  return (
    // Outer container: sets the background to a deep, dark gray
    <div className="min-h-screen bg-gray-950 flex justify-center items-start md:items-center p-0 md:p-10">
        
        {/* --- Main Chat Interface Container --- */}
        <div 
            className="
                flex w-full h-screen md:h-[90vh] 
                md:max-w-4xl lg:max-w-6xl 
                md:rounded-lg md:shadow-2xl overflow-hidden border-2 border-rose-900/50 shadow-rose-900/50
            "
        >
            {/* 1. Chat List Column... */}
            <div 
                className={`
                    flex-shrink-0 md:w-80 lg:w-96 
                    ${isListView ? 'w-full' : 'hidden md:block'}
                `}
            >
                <ChatListColumn 
                    chats={chats} 
                    activeChatId={activeChatId} 
                    onSelectChat={handleSelectChat} 
                />
            </div>
            
            {/* 2. Chat Window */}
            <div 
                className={`
                    flex-grow 
                    ${isListView ? 'hidden md:block' : 'w-full h-full'}
                `}
            >
                {activeChatId ? (
                    <ChatWindow 
                        chat={chats.filter(chat => chat.id === activeChatId)[0]}
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-900">
                        <p className="text-fuchsia-400 font-mono text-xl animate-pulse">
                            &gt; AWAITING CONNECTION SIGNAL...
                        </p>
                    </div>
                )}
            </div>

            {/* Back Button for Mobile View (Rose/Red) */}
            {!isListView && (
                 <button 
                    onClick={() => setIsListView(true)}
                    className="absolute top-4 left-4 md:hidden p-2 text-rose-400 bg-gray-800 rounded-full shadow-lg z-10 border border-rose-900 hover:shadow-rose-700/50"
                 >
                    {/* Back Arrow Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                </button>
            )}
        </div>
    </div>
  );
}

export default function Home() {
  return (
    <CombinedChatApp />
  );
}