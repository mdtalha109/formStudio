import { RegisterForm } from '@features/auth';

function RegisterPage() {
  return (
    <div className="bg-muted flex min-h-screen items-center justify-center px-6">
      <div className="border-border bg-background w-full max-w-sm rounded-lg border p-8">
        <h1 className="text-foreground mb-6 text-center text-2xl font-bold">Create Account</h1>
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
