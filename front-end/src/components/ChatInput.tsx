'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Paperclip, Smile } from 'lucide-react';

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
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg sm:max-w-md sm:mx-auto sm:left-0 sm:right-0">
      <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-2xl">
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-indigo-600">
          <Paperclip className="w-5 h-5" />
        </Button>
        <Input
          ref={inputRef}
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
        />
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-indigo-600">
          <Smile className="w-5 h-5" />
        </Button>
        <Button 
          size="icon" 
          className="rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-colors"
          onClick={handleSend}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
