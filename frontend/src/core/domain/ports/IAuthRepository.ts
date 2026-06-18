import type { User } from '../entities/User';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterDetails {
  name: string;
  email: string;
  password: string;
}

export interface AuthResult {
  user: User;
  accessToken: string;
}

export interface IAuthRepository {
  login(credentials: AuthCredentials): Promise<AuthResult>;
  register(details: RegisterDetails): Promise<AuthResult>;
  getCurrentUser(accessToken: string): Promise<User>;
}
