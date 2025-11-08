'use client';

import ChatListItem from '@/components/ChatListItem';
import { useChat } from '@/app/context/ChatContext';

export default function ChatsPage() {
  const { chats } = useChat();

  return (
    <main className="min-h-screen p-4 flex flex-col items-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">💬 Your Chats</h1>
      <div className="flex flex-col gap-3 w-full max-w-md">
        {chats.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} />
        ))}
      </div>
    </main>
  );
}