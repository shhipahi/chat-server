import React from 'react';
import { UserAvatar } from './UserAvatar';
import type { User } from '../types';
import { Bell, Search, Image, FileText, Lock, ChevronDown } from 'lucide-react';

interface UserInfoPanelProps {
    user: User;
    onClose?: () => void; // On mobile maybe
    className?: string; // For responsive hiding
}

const OptionItem = ({ icon: Icon, label }: { icon: any, label: string }) => (
    <button className="flex items-center justify-between w-full p-3 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg transition-colors">
        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Icon className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-sm">{label}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
    </button>
);

export const UserInfoPanel: React.FC<UserInfoPanelProps> = ({ user, className }) => {
    return (
        <div className={`flex flex-col h-full bg-white dark:bg-zinc-900 border-l border-gray-200 dark:border-zinc-800 overflow-y-auto ${className}`}>
            <div className="flex flex-col items-center py-8 border-b border-gray-100 dark:border-zinc-800">
                <UserAvatar name={user.name} src={user.avatar} size="xl" className="mb-3" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{user.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Active now</p>

                <div className="flex gap-4 mt-6">
                    <div className="flex flex-col items-center gap-1 cursor-pointer group">
                        <div className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-full group-hover:bg-gray-200 dark:group-hover:bg-zinc-700 transition-colors">
                            <UserAvatar name={user.name} src={user.avatar} size="sm" className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Profile</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 cursor-pointer group">
                        <div className="p-2.5 bg-gray-100 dark:bg-zinc-800 rounded-full group-hover:bg-gray-200 dark:group-hover:bg-zinc-700 transition-colors">
                            <Bell className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Mute</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 cursor-pointer group">
                        <div className="p-2.5 bg-gray-100 dark:bg-zinc-800 rounded-full group-hover:bg-gray-200 dark:group-hover:bg-zinc-700 transition-colors">
                            <Search className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Search</span>
                    </div>
                </div>
            </div>

            <div className="p-2 space-y-1">
                <OptionItem icon={Image} label="Media, files and links" />
                <OptionItem icon={Lock} label="Privacy & support" />
                <OptionItem icon={FileText} label="Chat info" />
                <OptionItem icon={Bell} label="Notifications" />
            </div>
        </div>
    );
};
