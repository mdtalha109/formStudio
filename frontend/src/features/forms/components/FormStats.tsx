import { List, Inbox, TrendingUp } from 'lucide-react';
import type { Form } from '@core/domain/entities/Form';

interface FormStatsProps {
  forms: Form[];
}

function FormStats({ forms }: FormStatsProps) {
  const stats = [
    { label: 'Total Forms', value: String(forms.length), icon: List },
    { label: 'Recent Submissions', value: '—', icon: Inbox },
    { label: 'Conversion Rate', value: '—', icon: TrendingUp },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="border-border flex items-center justify-between rounded-lg border p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
        >
          <div>
            <p className="text-subtle-foreground text-xs font-medium tracking-wide uppercase">
              {label}
            </p>
            <p className="text-foreground mt-1 text-2xl font-bold">{value}</p>
          </div>
          <div className="bg-primary-light rounded-md p-2">
            <Icon className="text-primary size-5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FormStats;
