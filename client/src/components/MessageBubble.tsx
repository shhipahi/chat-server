import React from 'react';
import { cn } from '../utils/cn';
import type { Message } from '../types';
import { UserAvatar } from './UserAvatar';

interface MessageBubbleProps {
    message: Message;
    previousMessage?: Message;
    nextMessage?: Message;
    senderAvatar?: string;
    senderName: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
    message,
    nextMessage,
    senderAvatar,
    senderName
}) => {
    const isOwn = message.isOwn;
    const isLastInSequence = nextMessage?.senderId !== message.senderId;

    // Logic to determine border radius for grouping
    // If own: 
    //   Normal: rounded-xl
    //   Sequence start: rounded-tr-lg
    //   Sequence middle: rounded-r-lg
    //   Sequence end: rounded-br-xl
    // Simplified for modern look: just round all, maybe slightly less on the stacking side

    return (
        <div className={cn(
            "flex w-full mb-1",
            isOwn ? "justify-end" : "justify-start",
            !isLastInSequence ? "mb-0.5" : "mb-2"
        )}>
            {!isOwn && (
                <div className="flex-shrink-0 mr-2 w-8">
                    {isLastInSequence ? (
                        <UserAvatar name={senderName} src={senderAvatar} size="sm" />
                    ) : <div className="w-8" />}
                </div>
            )}

            <div
                className={cn(
                    "max-w-[70%] px-4 py-2 text-sm relative group",
                    isOwn
                        ? "bg-blue-500 text-white rounded-2xl rounded-tr-sm"
                        : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded-2xl rounded-tl-sm",
                    // Adjust corners for sequences if needed, strict Messenger style
                    // For now, the above bubbles are good enough
                )}
            >
                <p>{message.text}</p>

                {/* Timestamp on hover or always? Messenger shows on tap/click or usually hidden until swipe. 
            We'll show simple tooltip or adjacent time if needed. For now, simple. 
        */}
            </div>

            {/* Optional: Status indicators for own messages */}
        </div>
    );
};
