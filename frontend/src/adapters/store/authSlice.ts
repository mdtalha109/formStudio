import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '@core/domain/entities/User';
import type { AuthCredentials, RegisterDetails } from '@core/domain/ports/IAuthRepository';
import { authRepository } from '@adapters/repositories/AuthRepository';
import { getStoredToken, setStoredToken, clearStoredToken } from '@adapters/storage/tokenStorage';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: 'idle' | 'loading' | 'error';
  error: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: 'idle',
  error: null,
  isInitialized: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: AuthCredentials) => authRepository.login(credentials),
);

export const register = createAsyncThunk(
  'auth/register',
  async (details: RegisterDetails) => authRepository.register(details),
);

export const restoreSession = createAsyncThunk('auth/restoreSession', async () => {
  const accessToken = getStoredToken();
  if (!accessToken) {
    return null;
  }
  const user = await authRepository.getCurrentUser(accessToken);
  return { user, accessToken };
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.status = 'idle';
      state.error = null;
      clearStoredToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        setStoredToken(action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        setStoredToken(action.payload.accessToken);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Registration failed';
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.isInitialized = true;
        if (action.payload) {
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
        }
      })
      .addCase(restoreSession.rejected, (state) => {
        state.isInitialized = true;
        state.user = null;
        state.accessToken = null;
        clearStoredToken();
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
