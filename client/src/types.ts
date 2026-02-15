export interface User {
    id: string;
    name: string;
    avatar?: string;
    isOnline?: boolean;
}

export interface Message {
    id: string;
    text: string;
    senderId: string;
    timestamp: string;
    isOwn: boolean;
}

export interface Chat {
    id: string;
    user: User;
    messages: Message[];
    unreadCount?: number;
}
