'use client';

import { useChats } from '@/app/context/ChatContext';
import Link from 'next/link';

export default function ChatsPage() {
  const { chats } = useChats();

  console.log(chats);
  

  return (
    <div>
      {chats.map((chat) => (
        <Link key={chat.id} href={`/chats/${chat.id}`}>
          <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
            <p className="font-semibold">{chat.participants[1]?.name}</p>
            <p className="text-sm text-gray-500 truncate">{chat.messages.at(-1)?.text}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}