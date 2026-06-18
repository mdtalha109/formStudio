import { LoginForm } from '@features/auth';

function LoginPage() {
  return (
    <div className="bg-muted flex min-h-screen items-center justify-center px-6">
      <div className="border-border bg-background w-full max-w-sm rounded-lg border p-8">
        <h1 className="text-foreground mb-1 text-center text-2xl font-bold">Sign In</h1>
        <p className="text-subtle-foreground mb-6 text-center text-sm">
          demo@formstudio.io / password123
        </p>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
