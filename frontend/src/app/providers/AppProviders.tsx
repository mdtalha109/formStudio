import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { reduxStore } from '@adapters/store/reduxStore';
import { queryClient } from '@adapters/query/queryClient';

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={reduxStore}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
          <Toaster position="top-right" />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default AppProviders;
