'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Message = {
  id: string;
  sender: string; // 'me' or other user
  text: string;
  timestamp: string;
};

export type Chat = {
  id: string;
  name: string; // chat participant
  messages: Message[];
};

type ChatContextType = {
  chats: Chat[];
  addMessage: (chatId: string, message: Omit<Message, 'id'>) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Alice',
      messages: [
        { id: 'm1', sender: 'Alice', text: 'Hey! How’s studying going?', timestamp: '10:45 AM' },
        { id: 'm2', sender: 'me', text: 'Pretty good! Working on math problems.', timestamp: '10:46 AM' },
        { id: 'm3', sender: 'Alice', text: 'Awesome! Need help with any topic?', timestamp: '10:47 AM' },
      ],
    },
    {
      id: '2',
      name: 'Bob',
      messages: [
        { id: 'm4', sender: 'Bob', text: 'Did you review the last lecture?', timestamp: 'Yesterday' },
        { id: 'm5', sender: 'me', text: 'Yes, just finished!', timestamp: 'Yesterday' },
      ],
    },
    {
      id: '3',
      name: 'Charlie',
      messages: [
        { id: 'm6', sender: 'Charlie', text: 'Ready for the study session tomorrow?', timestamp: '2 days ago' },
      ],
    },
  ]);

  const addMessage = (chatId: string, message: Omit<Message, 'id'>) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { id: `m${Date.now()}`, ...message },
              ],
            }
          : chat
      )
    );
  };

  return (
    <ChatContext.Provider value={{ chats, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
}
