import type {
  IAuthRepository,
  AuthCredentials,
  RegisterDetails,
  AuthResult,
} from '@core/domain/ports/IAuthRepository';
import type { User } from '@core/domain/entities/User';
import { httpClient } from '@adapters/api/httpClient';

export class AuthRepository implements IAuthRepository {
  async login(credentials: AuthCredentials): Promise<AuthResult> {
    return httpClient.post<AuthResult>('/api/auth/login', credentials);
  }

  async register(details: RegisterDetails): Promise<AuthResult> {
    return httpClient.post<AuthResult>('/api/auth/register', details);
  }

  async getCurrentUser(accessToken: string): Promise<User> {
    return httpClient.get<User>('/api/auth/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
}

export const authRepository = new AuthRepository();
