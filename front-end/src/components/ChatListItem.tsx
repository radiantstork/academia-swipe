'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function ChatListItem({ chat }: { chat: any }) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/chats/${chat.id}`)}
      className="hover:shadow-md transition cursor-pointer w-full"
    >
      <CardContent className="flex justify-between items-center p-4">
        <div>
          <h3 className="font-semibold text-gray-800">{chat.name}</h3>
          <p className="text-gray-500 text-sm truncate max-w-[200px]">
            {chat.lastMessage}
          </p>
        </div>
        <span className="text-xs text-gray-400">{chat.time}</span>
      </CardContent>
    </Card>
  );
}
