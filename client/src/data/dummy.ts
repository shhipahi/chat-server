import type { Chat } from '../types';

export const currentUser = {
    id: 'me',
    name: 'Rojan Shahi',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
};

export const chats: Chat[] = [
    {
        id: '1',
        user: {
            id: 'u1',
            name: 'Sarah Wilson',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
            isOnline: true,
        },
        messages: [
            { id: 'm1', text: 'Hey there! How are you?', senderId: 'u1', timestamp: '10:30 AM', isOwn: false },
            { id: 'm2', text: 'I am doing great, thanks for asking!', senderId: 'me', timestamp: '10:32 AM', isOwn: true },
            { id: 'm3', text: 'Are we still on for the meeting later?', senderId: 'u1', timestamp: '10:33 AM', isOwn: false },
        ],
        unreadCount: 1,
    },
    {
        id: '2',
        user: {
            id: 'u2',
            name: 'Michael Brown',
            isOnline: false,
        },
        messages: [
            { id: 'm1', text: 'Did you see the new design updates?', senderId: 'u2', timestamp: 'Yesterday', isOwn: false },
            { id: 'm2', text: 'Yes, they look amazing!', senderId: 'me', timestamp: 'Yesterday', isOwn: true },
        ],
    },
    {
        id: '3',
        user: {
            id: 'u3',
            name: 'Emma Davis',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
            isOnline: true,
        },
        messages: [
            { id: 'm1', text: 'Can you send me the files?', senderId: 'me', timestamp: 'Mon', isOwn: true },
            { id: 'm2', text: 'Sure, let me check.', senderId: 'u3', timestamp: 'Mon', isOwn: false },
            { id: 'm3', text: 'Here they are.', senderId: 'u3', timestamp: 'Mon', isOwn: false },
        ],
    },
    {
        id: '4',
        user: {
            id: 'u4',
            name: 'James Rodriguez',
        },
        messages: [
            { id: 'm1', text: 'Happy Birthday!', senderId: 'u4', timestamp: 'Last week', isOwn: false },
        ],
    },
    {
        id: '5',
        user: {
            id: 'u5',
            name: 'Lisa Anderson',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        },
        messages: [
            { id: 'm1', text: 'See you tomorrow!', senderId: 'me', timestamp: '2 weeks ago', isOwn: true },
        ],
    },
    {
        id: '6',
        user: { id: 'u6', name: 'David Smith', isOnline: true },
        messages: [{ id: 'm1', text: 'Ok.', senderId: 'u6', timestamp: '1 min ago', isOwn: false }],
    },
    {
        id: '7',
        user: { id: 'u7', name: 'Jennifer Lopez' },
        messages: [{ id: 'm1', text: 'Thanks!', senderId: 'me', timestamp: '2 years ago', isOwn: true }],
    },
    {
        id: '8',
        user: { id: 'u8', name: 'Robert Downey Jr.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
        messages: [{ id: 'm1', text: 'I am Iron Man.', senderId: 'u8', timestamp: 'Infinity War', isOwn: false }],
    }
];
