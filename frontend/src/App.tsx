import AppProviders from '@app/providers/AppProviders';
import AppRouter from '@app/router/AppRouter';
import { AuthBootstrap } from '@features/auth';

function App() {
  return (
    <AppProviders>
      <AuthBootstrap />
      <AppRouter />
    </AppProviders>
  );
}

export default App;
