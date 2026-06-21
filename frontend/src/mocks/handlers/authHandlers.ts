import { http, HttpResponse } from 'msw';
import type { User } from '@core/domain/entities/User';

interface MockUserRecord extends User {
  password: string;
}

const users: MockUserRecord[] = [
  { id: 'user_1', name: 'Demo User', email: 'demo@formstudio.io', password: 'password123' },
];

function toAccessToken(userId: string) {
  return `mock-token.${userId}.${Date.now()}`;
}

function parseUserIdFromToken(token: string): string | null {
  const [prefix, userId] = token.split('.');
  return prefix === 'mock-token' ? userId : null;
}

export const authHandlers = [
  http.post('/api/auth/register', async ({ request }) => {
    const body = (await request.json()) as { name: string; email: string; password: string };

    if (users.some((u) => u.email === body.email)) {
      return HttpResponse.json({ message: 'Email already registered' }, { status: 409 });
    }

    const newUser: MockUserRecord = {
      id: `user_${users.length + 1}`,
      name: body.name,
      email: body.email,
      password: body.password,
    };
    users.push(newUser);

    const { password: _password, ...user } = newUser;
    return HttpResponse.json(
      { user, accessToken: toAccessToken(newUser.id) },
      { status: 201 },
    );
  }),

  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    const match = users.find(
      (u) => u.email === body.email && u.password === body.password,
    );

    if (!match) {
      return HttpResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const { password: _password, ...user } = match;
    return HttpResponse.json({ user, accessToken: toAccessToken(match.id) }, { status: 200 });
  }),

  http.get('/api/auth/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    const userId = token ? parseUserIdFromToken(token) : null;
    const match = userId ? users.find((u) => u.id === userId) : undefined;

    if (!match) {
      return HttpResponse.json({ message: 'Invalid or expired session' }, { status: 401 });
    }

    const { password: _password, ...user } = match;
    return HttpResponse.json(user, { status: 200 });
  }),
];
