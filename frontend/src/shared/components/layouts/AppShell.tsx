import type { ReactNode } from 'react';
import Sidebar from './Sidebar';

function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 py-4">{children}</div>
    </div>
  );
}

export default AppShell;
