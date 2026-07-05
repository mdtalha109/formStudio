import { http, HttpResponse } from 'msw';
import type { NormalizedSchema } from '@core/domain/entities/SchemaNode';
import { sampleSchema } from '@core/usecases/builder/sampleSchema';

const schemaStore = new Map<string, NormalizedSchema>([
  ['form_1', sampleSchema],
  ['form_2', sampleSchema],
  ['form_3', sampleSchema],
]);

export const formSchemaHandlers = [
  http.get('/api/forms/:formId/schema', ({ params }) => {
    const schema = schemaStore.get(params.formId as string);
    if (!schema) {
      return HttpResponse.json({ message: 'Schema not found' }, { status: 404 });
    }
    return HttpResponse.json(schema, { status: 200 });
  }),

  http.patch('/api/forms/:formId/schema', async ({ params, request }) => {
    const schema = (await request.json()) as NormalizedSchema;
    schemaStore.set(params.formId as string, schema);
    return HttpResponse.json(schema, { status: 200 });
  }),
];
