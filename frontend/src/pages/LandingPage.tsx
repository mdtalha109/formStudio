import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@app/router/routes';
import { BuilderPreviewMockup } from '@features/landing';

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-8 py-6">
        <span className="text-xl font-semibold">FormStudio</span>
        <Link to={ROUTES.LOGIN} className="font-medium hover:underline">
          Sign In
        </Link>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-16 pb-20 lg:grid-cols-2">
          <div>
            <span className="bg-primary-light text-primary inline-block rounded-full px-3 py-1 text-sm font-medium">
              Now Live
            </span>
            <h1 className="text-foreground mt-5 text-4xl leading-tight font-bold sm:text-5xl">
              Build powerful forms
              <br />
              <span className="text-primary">without writing code</span>
            </h1>
            <p className="text-muted-foreground mt-5 text-lg">
              FormStudio is a schema-driven drag-and-drop form builder with validation,
              conditional logic, and analytics built in. Empower your team to launch in
              minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={ROUTES.REGISTER}
                className="bg-primary text-primary-foreground hover:bg-primary-hover inline-flex items-center gap-2 rounded-md px-7 py-3 font-semibold"
              >
                Get Started Free
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <BuilderPreviewMockup />
        </section>

      </main>
    </div>
  );
}

export default LandingPage;
