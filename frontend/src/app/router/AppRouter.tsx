import { Routes, Route } from 'react-router-dom';
import LandingPage from '@pages/LandingPage';
import { ROUTES } from './routes';

function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<LandingPage />} />
    </Routes>
  );
}

export default AppRouter;
