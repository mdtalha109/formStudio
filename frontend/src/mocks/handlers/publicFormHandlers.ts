import { http, HttpResponse } from 'msw';
import type { PublicFormData } from '@adapters/api/publicFormApi';
import { sampleSchema } from '@core/usecases/builder/sampleSchema';

interface Submission {
  submissionId: string;
  slug: string;
  submittedAt: string;
  values: Record<string, unknown>;
}

const publicForms = new Map<string, PublicFormData>([
  [
    'customer-feedback-survey',
    { slug: 'customer-feedback-survey', title: 'Customer Feedback Survey', schema: sampleSchema },
  ],
  [
    'demo-form',
    { slug: 'demo-form', title: 'Demo Form', schema: sampleSchema },
  ],
]);

const submissions: Submission[] = [];

export const publicFormHandlers = [
  http.get('/api/public/forms/:slug', ({ params }) => {
    const form = publicForms.get(params.slug as string);
    if (!form) {
      return HttpResponse.json({ message: 'Form not found' }, { status: 404 });
    }
    return HttpResponse.json(form, { status: 200 });
  }),

  http.post('/api/public/forms/:slug/submit', async ({ params, request }) => {
    const slug = params.slug as string;
    if (!publicForms.has(slug)) {
      return HttpResponse.json({ message: 'Form not found' }, { status: 404 });
    }
    const values = (await request.json()) as Record<string, unknown>;
    const submission: Submission = {
      submissionId: crypto.randomUUID(),
      slug,
      submittedAt: new Date().toISOString(),
      values,
    };
    submissions.push(submission);
    return HttpResponse.json(
      { submissionId: submission.submissionId, submittedAt: submission.submittedAt },
      { status: 201 },
    );
  }),
];
