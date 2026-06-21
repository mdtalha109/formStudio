import { NavLink } from 'react-router-dom';
import { FileText, BarChart3, LayoutGrid, Settings } from 'lucide-react';
import { useAuth } from '@features/auth';
import { Button } from '@shared/components/ui';
import { cn } from '@shared/utils/cn';
import { ROUTES } from '@app/router/routes';

const NAV_ITEMS = [{ label: 'Forms', icon: FileText, to: ROUTES.DASHBOARD }] as const;

const DISABLED_NAV_ITEMS = [
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Templates', icon: LayoutGrid },
  { label: 'Settings', icon: Settings },
] as const;

function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="bg-muted border-border flex w-60 shrink-0 flex-col border-r px-4 py-6">
      <div className="text-primary px-2 text-xl font-bold">FormStudio</div>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-background',
              )
            }
          >
            <Icon className="size-4" />
            {label}
          </NavLink>
        ))}

        {DISABLED_NAV_ITEMS.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="text-subtle-foreground flex cursor-not-allowed items-center gap-3 rounded-md px-3 py-2 text-sm opacity-50"
            title="Coming soon"
          >
            <Icon className="size-4" />
            {label}
          </div>
        ))}
      </nav>

      <div className="border-border border-t pt-4">
        <p className="text-foreground truncate px-2 text-sm font-medium">{user?.name}</p>
        <Button type="button" variant="secondary" size="sm" onClick={logout} className="mt-2 w-full">
          Log Out
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;
