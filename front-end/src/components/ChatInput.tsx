'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ChatInput({ onSend }: { onSend: (msg: string) => void }) {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
    inputRef.current?.focus();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t flex gap-2 sm:max-w-md sm:mx-auto sm:left-0 sm:right-0">
      <Input
        ref={inputRef}
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        className="flex-1"
      />
      <Button onClick={handleSend}>Send</Button>
    </div>
  );
}
