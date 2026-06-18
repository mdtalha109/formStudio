import { useAuth } from '@features/auth';
import { Button } from '@shared/components/ui';

function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-border flex items-center justify-between border-b px-8 py-4">
        <span className="text-lg font-semibold">FormStudio</span>
        <Button type="button" variant="secondary" size="sm" onClick={logout}>
          Log Out
        </Button>
      </header>
      <main className="flex-1 px-8 py-10">
        <h1 className="text-foreground text-2xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground mt-2">
          Your forms will show up here once the Dashboard feature is built.
        </p>
      </main>
    </div>
  );
}

export default DashboardPage;
