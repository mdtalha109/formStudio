import type { NormalizedSchema } from '@core/domain/entities/SchemaNode';

const sectionId = 'sample-section';
const rowId = 'sample-row';
const columnId = 'sample-column';
const fieldOneId = 'sample-field-name';
const fieldTwoId = 'sample-field-email';

export const sampleSchema: NormalizedSchema = {
  rootId: sectionId,
  nodes: {
    [sectionId]: {
      id: sectionId,
      parentId: null,
      childIds: [rowId],
      type: 'section',
      config: { title: 'Untitled section' },
    },
    [rowId]: {
      id: rowId,
      parentId: sectionId,
      childIds: [columnId],
      type: 'row',
      config: {},
    },
    [columnId]: {
      id: columnId,
      parentId: rowId,
      childIds: [fieldOneId, fieldTwoId],
      type: 'column',
      config: {},
    },
    [fieldOneId]: {
      id: fieldOneId,
      parentId: columnId,
      childIds: [],
      type: 'field',
      fieldType: 'text',
      config: { label: 'Full name', placeholder: 'Jane Doe', required: true },
    },
    [fieldTwoId]: {
      id: fieldTwoId,
      parentId: columnId,
      childIds: [],
      type: 'field',
      fieldType: 'email',
      config: { label: 'Email address', placeholder: 'you@example.com', required: true },
    },
  },
};
