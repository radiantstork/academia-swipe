'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import { useChats } from '@/app/context/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useUser } from '@/app/context/UserContext';

export default function ChatRoomPage() {
  const { chatId } = useParams() as { chatId: string };
  const router = useRouter();
  const { chats, addMessage } = useChats();
  const { user } = useUser();

  const chat = chats.find((c) => c.id === chatId);
  console.log(chat);
  console.log(chats);
  
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isOnline] = useState(true); // In a real app, this would be determined by the user's status

  // Scroll to bottom on messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Chat not found</h2>
          <p className="text-gray-600 mb-4">This conversation might have been deleted or doesn't exist.</p>
          <Button onClick={() => router.push('/chats')}>Return to Chats</Button>
        </div>
      </div>
    );
  }

  const handleSend = (text: string) => {
    addMessage(chatId, { id: Date.now().toString(), sender: user?.id || '', text, timestamp: new Date() });
  };

  return (
    <main className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/chats')} className="hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-lg font-semibold text-indigo-600">
                  {chat.participants[1].name[0].toUpperCase()}
                </span>
              </div>
              {isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">{chat.participants[1].name}</h2>
              <p className="text-xs text-gray-500">{isOnline ? 'Online' : 'Offline'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24 sm:max-w-md sm:mx-auto w-full">
        <AnimatePresence initial={false}>
          {chat.messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <ChatMessage message={msg} />
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} />
    </main>
  );
}
