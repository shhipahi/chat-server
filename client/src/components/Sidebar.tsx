import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { cn } from '../utils/cn';

export interface ChatPreview {
    id: string;
    user: {
        name: string;
        avatar?: string;
        isOnline?: boolean;
    };
    lastMessage: {
        text: string;
        timestamp: string;
        isUnread?: boolean;
    };
    unreadCount?: number;
}

interface SidebarProps {
    chats: ChatPreview[];
    activeChatId?: string;
    onSelectChat: (chatId: string) => void;
    className?: string; // Allow external styling/hiding
}

export const Sidebar: React.FC<SidebarProps> = ({
    chats,
    activeChatId,
    onSelectChat,
    className
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredChats = chats.filter(chat =>
        chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={cn("flex flex-col h-full bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800", className)}>
            <div className="p-4 border-b border-gray-100 dark:border-zinc-800">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search Messenger"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-gray-100 transition-shadow"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {filteredChats.map((chat) => (
                    <div
                        key={chat.id}
                        onClick={() => onSelectChat(chat.id)}
                        className={cn(
                            "flex items-center p-3 cursor-pointer transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-zinc-800 mx-2 rounded-lg my-1",
                            activeChatId === chat.id && "bg-blue-50 dark:bg-blue-900/20"
                        )}
                    >
                        <UserAvatar
                            name={chat.user.name}
                            src={chat.user.avatar}
                            isOnline={chat.user.isOnline}
                            size="lg"
                        />

                        <div className="ml-3 flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <span className={cn(
                                    "font-medium truncate",
                                    chat.lastMessage.isUnread ? "text-gray-900 dark:text-gray-100 font-bold" : "text-gray-900 dark:text-gray-100"
                                )}>
                                    {chat.user.name}
                                </span>
                                <span className={cn(
                                    "text-xs ml-2 whitespace-nowrap",
                                    chat.lastMessage.isUnread ? "text-blue-600 font-bold" : "text-gray-500"
                                )}>
                                    {chat.lastMessage.timestamp}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <p className={cn(
                                    "text-sm truncate pr-2",
                                    chat.lastMessage.isUnread ? "text-gray-900 dark:text-gray-100 font-semibold" : "text-gray-500 dark:text-gray-400"
                                )}>
                                    {chat.lastMessage.isUnread && <span className="mr-1 inline-block w-2 h-2 bg-blue-500 rounded-full align-middle"></span>}
                                    {chat.user.name.split(' ')[0]}: {chat.lastMessage.text}
                                </p>

                                {chat.unreadCount ? (
                                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                                        {chat.unreadCount}
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
