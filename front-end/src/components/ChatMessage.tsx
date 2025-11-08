'use client';

import clsx from 'clsx';

export default function ChatMessage({ message }: { message: any }) {
  const isUser = message.sender === 'me';
  return (
    <div
      className={clsx(
        'flex mb-2',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={clsx(
          'px-4 py-2 rounded-2xl max-w-xs text-sm',
          isUser
            ? 'bg-indigo-600 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        )}
      >
        {message.text}
      </div>
    </div>
  );
}
