import { Chat } from "@/app/context/ChatContext"
import { User, useUser } from "@/app/context/UserContext"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getChattingUser(chat: Chat) {
  // Defensive: log and check for undefined/null
  console.log('chat:', chat);
  console.log('participants:', chat?.participants);
  const { user } = useUser();

  const result = chat.participants[0].id === user?.id ? chat.participants[1] : chat.participants[0];
  console.log('getChattingUser result:', result);
  return result;
}