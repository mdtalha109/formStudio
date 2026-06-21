import { http, HttpResponse } from 'msw';
import type { Form } from '@core/domain/entities/Form';

function daysAgo(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString();
}

let forms: Form[] = [
  {
    id: 'form_1',
    title: 'Customer Feedback Survey',
    status: 'published',
    createdAt: daysAgo(5),
    updatedAt: daysAgo(2),
  },
  {
    id: 'form_2',
    title: 'Job Application Form',
    status: 'draft',
    createdAt: daysAgo(3),
    updatedAt: daysAgo(1),
  },
  {
    id: 'form_3',
    title: 'Event Registration',
    status: 'draft',
    createdAt: daysAgo(1),
    updatedAt: daysAgo(0),
  },
];

let nextFormId = forms.length + 1;

function findForm(id: string): Form | undefined {
  return forms.find((f) => f.id === id);
}

export const formHandlers = [
  http.get('/api/forms', () => {
    return HttpResponse.json(forms, { status: 200 });
  }),

  http.post('/api/forms', async ({ request }) => {
    const body = (await request.json()) as { title: string };
    const now = new Date().toISOString();
    const newForm: Form = {
      id: `form_${nextFormId++}`,
      title: body.title,
      status: 'draft',
      createdAt: now,
      updatedAt: now,
    };
    forms.push(newForm);
    return HttpResponse.json(newForm, { status: 201 });
  }),

  http.patch('/api/forms/:id', async ({ params, request }) => {
    const form = findForm(params.id as string);
    if (!form) {
      return HttpResponse.json({ message: 'Form not found' }, { status: 404 });
    }
    const body = (await request.json()) as { title: string };
    form.title = body.title;
    form.updatedAt = new Date().toISOString();
    return HttpResponse.json(form, { status: 200 });
  }),

  http.delete('/api/forms/:id', ({ params }) => {
    const exists = findForm(params.id as string);
    if (!exists) {
      return HttpResponse.json({ message: 'Form not found' }, { status: 404 });
    }
    forms = forms.filter((f) => f.id !== params.id);
    return new HttpResponse(null, { status: 204 });
  }),

  http.post('/api/forms/:id/duplicate', ({ params }) => {
    const form = findForm(params.id as string);
    if (!form) {
      return HttpResponse.json({ message: 'Form not found' }, { status: 404 });
    }
    const now = new Date().toISOString();
    const duplicate: Form = {
      id: `form_${nextFormId++}`,
      title: `${form.title} (Copy)`,
      status: 'draft',
      createdAt: now,
      updatedAt: now,
    };
    forms.push(duplicate);
    return HttpResponse.json(duplicate, { status: 201 });
  }),

  http.post('/api/forms/:id/publish', ({ params }) => {
    const form = findForm(params.id as string);
    if (!form) {
      return HttpResponse.json({ message: 'Form not found' }, { status: 404 });
    }
    form.status = 'published';
    form.updatedAt = new Date().toISOString();
    return HttpResponse.json(form, { status: 200 });
  }),

  http.post('/api/forms/:id/unpublish', ({ params }) => {
    const form = findForm(params.id as string);
    if (!form) {
      return HttpResponse.json({ message: 'Form not found' }, { status: 404 });
    }
    form.status = 'draft';
    form.updatedAt = new Date().toISOString();
    return HttpResponse.json(form, { status: 200 });
  }),
];
