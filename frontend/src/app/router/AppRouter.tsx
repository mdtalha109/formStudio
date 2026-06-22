import { Routes, Route } from 'react-router-dom';
import LandingPage from '@pages/LandingPage';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import DashboardPage from '@pages/DashboardPage';
import BuilderPage from '@pages/BuilderPage';
import { ROUTES } from './routes';
import AuthGuard from './guards/AuthGuard';
import PublicGuard from './guards/PublicGuard';

function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<LandingPage />} />
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicGuard>
            <LoginPage />
          </PublicGuard>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <PublicGuard>
            <RegisterPage />
          </PublicGuard>
        }
      />
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <AuthGuard>
            <DashboardPage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.BUILDER}
        element={
          <AuthGuard>
            <BuilderPage />
          </AuthGuard>
        }
      />
    </Routes>
  );
}

export default AppRouter;
