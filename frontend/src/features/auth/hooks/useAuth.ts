import { useAppDispatch, useAppSelector } from '@adapters/store/hooks';
import {
  login as loginThunk,
  register as registerThunk,
  logout as logoutAction,
} from '@adapters/store/authSlice';
import type { AuthCredentials, RegisterDetails } from '@core/domain/ports/IAuthRepository';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, accessToken, status, error, isInitialized } = useAppSelector(
    (state) => state.auth,
  );

  return {
    user,
    status,
    error,
    isInitialized,
    isAuthenticated: Boolean(user && accessToken),
    login: (credentials: AuthCredentials) => dispatch(loginThunk(credentials)).unwrap(),
    register: (details: RegisterDetails) => dispatch(registerThunk(details)).unwrap(),
    logout: () => dispatch(logoutAction()),
  };
}
