import type {
  IAuthRepository,
  AuthCredentials,
  RegisterDetails,
  AuthResult,
} from '@core/domain/ports/IAuthRepository';
import type { User } from '@core/domain/entities/User';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

function extractErrorMessage(data: unknown): string | undefined {
  if (typeof data === 'object' && data !== null && 'message' in data) {
    const message = (data as { message: unknown }).message;
    return typeof message === 'string' ? message : undefined;
  }
  return undefined;
}

async function parseJson<T>(response: Response): Promise<T> {
  const data: unknown = await response.json();

  if (!response.ok) {
    throw new Error(extractErrorMessage(data) ?? 'Request failed');
  }

  return data as T;
}

export class AuthRepository implements IAuthRepository {
  async login(credentials: AuthCredentials): Promise<AuthResult> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return parseJson<AuthResult>(response);
  }

  async register(details: RegisterDetails): Promise<AuthResult> {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details),
    });
    return parseJson<AuthResult>(response);
  }

  async getCurrentUser(accessToken: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return parseJson<User>(response);
  }
}

export const authRepository = new AuthRepository();
