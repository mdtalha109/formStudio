import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

function AppProviders({ children }: { children: ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

export default AppProviders;
