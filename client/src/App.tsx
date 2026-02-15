import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import type { ChatPreview } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { UserInfoPanel } from './components/UserInfoPanel';
import { chats as dummyChats } from './data/dummy';
import type { Message } from './types';

function App() {
  const [selectedChatId, setSelectedChatId] = useState<string>(dummyChats[0].id);
  const [showUserInfo, setShowUserInfo] = useState(true); // Toggle for right panel

  // Sync state (in real app, use Context or Redux/Zustand)
  const [chats, setChats] = useState(dummyChats);

  const selectedChat = chats.find(c => c.id === selectedChatId) || chats[0];

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      senderId: 'me',
      timestamp: 'Just now',
      isOwn: true,
    };

    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage]
        };
      }
      return chat;
    }));
  };

  // derived previews
  const previews: ChatPreview[] = chats.map(chat => {
    const lastMsg = chat.messages[chat.messages.length - 1];
    return {
      id: chat.id,
      user: chat.user,
      lastMessage: {
        text: lastMsg?.text || '',
        timestamp: lastMsg?.timestamp || '',
        isUnread: !lastMsg?.isOwn && chat.unreadCount && chat.unreadCount > 0 ? true : false,
      },
      unreadCount: chat.unreadCount,
    };
  });

  return (
    <div className="flex h-screen bg-white dark:bg-black overflow-hidden">
      {/* Left Sidebar - Hidden on mobile if chat is open, but we'll stick to 3-col desktop primarily */}
      <Sidebar
        chats={previews}
        activeChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
        className="w-[360px] flex-shrink-0 hidden md:flex"
      />

      {/* Center Chat Window */}
      <main className="flex-1 min-w-0 border-r border-gray-200 dark:border-zinc-800">
        <ChatWindow
          chat={selectedChat}
          onSendMessage={handleSendMessage}
        />
      </main>

      {/* Right User Info - Optional Toggle */}
      {showUserInfo && (
        <UserInfoPanel
          user={selectedChat.user}
          className="w-[320px] flex-shrink-0 hidden lg:flex"
        />
      )}
    </div>
  );
}

export default App;
