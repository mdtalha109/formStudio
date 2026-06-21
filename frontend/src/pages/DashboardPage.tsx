import { useForms, FormStats, FormList } from '@features/forms';
import { AppShell } from '@shared/components/layouts';

function DashboardPage() {
  const { data: forms, isLoading } = useForms();

  return (
    <AppShell>
      <div className="px-4 pb-10">
        {isLoading && <p className="text-muted-foreground">Loading forms...</p>}
       

        {forms && (
          <div className="flex flex-col gap-8">
            <FormStats forms={forms} />
            <div>
              <h2 className="text-foreground mb-4 text-lg font-semibold">Recent Forms</h2>
              <FormList forms={forms ?? []} />
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

export default DashboardPage;
