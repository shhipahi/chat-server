import React, { useState, useRef, useEffect } from 'react';
import { Send, MoreVertical, Phone, Video, Smile, PlusCircle, Image as ImageIcon, ThumbsUp } from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { MessageBubble } from './MessageBubble';
import type { Chat } from '../types';
import { cn } from '../utils/cn';

interface ChatWindowProps {
    chat: Chat;
    onSendMessage?: (text: string) => void;
    className?: string; // For responsive hiding
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
    chat,
    onSendMessage,
    className
}) => {
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' }); // Instant on load, smooth on new message?
    };

    useEffect(() => {
        scrollToBottom();
    }, [chat.messages]); // Scroll when messages change

    const handleSend = () => {
        if (inputValue.trim() && onSendMessage) {
            onSendMessage(inputValue);
            setInputValue('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={cn("flex flex-col h-full bg-white dark:bg-zinc-900", className)}>
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-zinc-800 shadow-sm z-10">
                <div className="flex items-center">
                    {/* Back button for mobile could go here */}
                    <UserAvatar
                        name={chat.user.name}
                        src={chat.user.avatar}
                        isOnline={chat.user.isOnline}
                        size="md"
                    />
                    <div className="ml-3">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">{chat.user.name}</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {chat.user.isOnline ? 'Active now' : 'Offline'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-gray-500 dark:text-blue-500/80">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full text-blue-500">
                        <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full text-blue-500">
                        <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full text-blue-500">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
                <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                    <UserAvatar name={chat.user.name} src={chat.user.avatar} size="xl" className="mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{chat.user.name}</h3>
                    <p className="text-sm">You're connected on Messenger</p>
                </div>

                {chat.messages.map((msg, index) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        previousMessage={chat.messages[index - 1]}
                        nextMessage={chat.messages[index + 1]}
                        senderAvatar={chat.user.avatar}
                        senderName={chat.user.name}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200 dark:border-zinc-800">
                <div className="flex items-end gap-2">
                    <button className="p-2 mb-1 text-blue-500 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full">
                        <PlusCircle className="w-6 h-6" />
                    </button>
                    <button className="p-2 mb-1 text-blue-500 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full">
                        <ImageIcon className="w-6 h-6" />
                    </button>
                    <button className="p-2 mb-1 text-blue-500 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full">
                        <Smile className="w-6 h-6" />
                    </button>

                    <div className="flex-1 relative bg-gray-100 dark:bg-zinc-800 rounded-2xl flex items-center min-h-[44px]">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Aa"
                            className="w-full bg-transparent border-none px-4 py-2 focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500"
                            style={{ minHeight: '44px' }}
                        />
                        <div className="pr-2">
                            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <Smile className="w-6 h-6" /> {/* Another smile? Or maybe a sticker icon */}
                            </button>
                        </div>
                    </div>

                    {inputValue.trim() ? (
                        <button
                            onClick={handleSend}
                            className="p-2 mb-1 text-blue-500 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full"
                        >
                            <Send className="w-6 h-6" />
                        </button>
                    ) : (
                        <button
                            className="p-2 mb-1 text-blue-500 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full"
                        >
                            <ThumbsUp className="w-6 h-6" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
