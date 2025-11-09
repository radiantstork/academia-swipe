'use client';

import { useUser } from '@/app/context/UserContext';
import clsx from 'clsx';
import { format } from 'date-fns';

export default function ChatMessage({ message }: { message: any }) {
  const { user } = useUser();
  const isUser = message.sender === user?.id;
  const timestamp = new Date(message.timestamp);

  return (
    <div
      className={clsx(
        'flex mb-4 group',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div className="flex flex-col max-w-[70%]">
        {/* Time - visible on hover */}
        <span
          className={clsx(
            'text-xs text-gray-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity',
            isUser ? 'text-right' : 'text-left'
          )}
        >
          {format(timestamp, 'HH:mm')}
        </span>
        
        {/* Message bubble */}
        <div
          className={clsx(
            'px-4 py-2.5 rounded-2xl text-sm',
            isUser
              ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-br-none shadow-indigo-100'
              : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-gray-100',
            'shadow-lg transition-all duration-200 hover:shadow-xl',
            'animate-in fade-in slide-in-from-bottom-2 duration-300'
          )}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
}
