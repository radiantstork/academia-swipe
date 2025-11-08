'use client';

import { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import { useChat } from '@/app/context/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function ChatRoomPage() {
  const { chatId } = useParams() as { chatId: string };
  const router = useRouter();
  const { chats, addMessage } = useChat();

  const chat = chats.find((c) => c.id === chatId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  if (!chat) return <div className="p-4">Chat not found</div>;

  const handleSend = (text: string) => {
    addMessage(chatId, { sender: 'me', text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
  };

  return (
    <main className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-indigo-50 border-b shadow-sm">
        <Button variant="ghost" onClick={() => router.push('/chats')}>
          ← Back
        </Button>
        <h2 className="font-semibold text-gray-800">{chat.name}</h2>
        <div className="w-10"></div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24 sm:max-w-md sm:mx-auto w-full">
        <AnimatePresence initial={false}>
          {chat.messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
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
