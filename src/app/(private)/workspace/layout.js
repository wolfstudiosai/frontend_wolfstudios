'use client';

import { ChatProvider } from '/src/contexts/chat';
import { SocketProvider } from '/src/contexts/socket';

export default function PrivateLayout({ children }) {
  return (
    <SocketProvider>
      <ChatProvider>{children}</ChatProvider>
    </SocketProvider>
  );
}
