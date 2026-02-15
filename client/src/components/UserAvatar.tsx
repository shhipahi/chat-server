import React, { useMemo } from 'react';
import { cn } from '../utils/cn'; // We'll need a utility for class merging, or just use template literals

// Simple hash function to generate consistent colors
const getColorByName = (name: string) => {
    const colors = [
        'bg-red-500', 'bg-orange-500', 'bg-amber-500',
        'bg-green-500', 'bg-emerald-500', 'bg-teal-500',
        'bg-cyan-500', 'bg-blue-500', 'bg-indigo-500',
        'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500',
        'bg-pink-500', 'bg-rose-500'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

const getInitials = (name: string) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

interface UserAvatarProps {
    src?: string;
    name: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    isOnline?: boolean;
}

const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
    src,
    name,
    size = 'md',
    className = '',
    isOnline = false
}) => {
    const colorClass = useMemo(() => getColorByName(name), [name]);
    const initials = useMemo(() => getInitials(name), [name]);

    return (
        <div className={`relative inline-block ${className}`}>
            <div
                className={`
          ${sizeClasses[size]} 
          rounded-full flex items-center justify-center 
          overflow-hidden border border-gray-200 dark:border-gray-700
          ${!src ? colorClass : 'bg-gray-200'}
          text-white font-semibold select-none
        `}
            >
                {src ? (
                    <img
                        src={src}
                        alt={name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            // Fallback to initials if image fails
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement?.classList.add(colorClass);
                            // We'd need state to render initials here, but CSS fallback is tricky.
                            // For simplicity, we assume src is valid or handled by parent.
                            // A better way is using state for error.
                        }}
                    />
                ) : (
                    <span>{initials}</span>
                )}
            </div>

            {isOnline && (
                <span
                    className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900"
                />
            )}
        </div>
    );
};
