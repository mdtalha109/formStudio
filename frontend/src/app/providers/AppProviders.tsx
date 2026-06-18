import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { reduxStore } from '@adapters/store/reduxStore';

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={reduxStore}>
      <BrowserRouter>
        {children}
        <Toaster position="top-right" />
      </BrowserRouter>
    </Provider>
  );
}

export default AppProviders;
