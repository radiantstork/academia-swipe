'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Profile } from '@/app/context/MatchContext';

export type Message = {
  id: string;
  sender: string; // name or id
  text: string;
  timestamp: Date;
};

export type Chat = {
  id: string;
  participants: Profile[];
  messages: Message[];
};

type ChatContextType = {
  chats: Chat[];
  createChat: (participants: Profile[], chatId: string) => Chat;
  addMessage: (chatId: string, message: Message) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      participants: [
        { id: 'self', name: 'You', role: 'student', subjects: [], branches: {}, availability: '' },
        { id: '2', name: 'Bob', role: 'teacher', subjects: ['Physics'], branches: {}, availability: 'Weekends' },
      ],
      messages: [
        { id: 'm1', sender: 'Bob', text: 'Hey! Looking forward to our study session.', timestamp: new Date() },
        { id: 'm2', sender: 'You', text: 'Same here! Let’s plan it for tomorrow.', timestamp: new Date() },
      ],
    },
  ]);

  const createChat = (participants: Profile[], chatId: string): Chat => {
    const newChat: Chat = {
      id: chatId,
      participants,
      messages: [
        {
          id: 'welcome',
          sender: participants[1]?.name || 'Match',
          text: `Hi ${participants[0]?.name || 'there'}! Excited to collaborate?`,
          timestamp: new Date(),
        },
      ],
    };
    setChats((prev) => [...prev, newChat]);
    return newChat;
  };

  const addMessage = (chatId: string, message: Message) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, messages: [...chat.messages, message] } : chat
      )
    );
  };

  return (
    <ChatContext.Provider value={{ chats, createChat, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChats() {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChats must be used within ChatProvider');
  return context;
}
