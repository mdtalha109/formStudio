import { z } from 'zod';
import type { NormalizedSchema, FieldNode, FieldType } from '@core/domain/entities/SchemaNode';

type NodeOf<T extends FieldType> = Extract<FieldNode, { fieldType: T }>;

function buildTextSchema(node: NodeOf<'text'>): z.ZodType {
  const { config } = node;
  let schema = z.string();
  if (config.required) schema = schema.min(1, `${config.label} is required`);
  if (config.minLength) schema = schema.min(config.minLength, `Minimum ${config.minLength} characters`);
  if (config.maxLength) schema = schema.max(config.maxLength, `Maximum ${config.maxLength} characters`);
  if (config.pattern) schema = schema.regex(new RegExp(config.pattern), 'Invalid format');
  return schema;
}

function buildEmailSchema(node: NodeOf<'email'>): z.ZodType {
  const { config } = node;
  if (config.required) {
    return z.string().min(1, `${config.label} is required`).email('Invalid email address');
  }
  // Optional: allow empty string (unset) or a valid email
  return z.union([z.string().email('Invalid email address'), z.literal('')]);
}

function buildPhoneSchema(node: NodeOf<'phone'>): z.ZodType {
  const { config } = node;
  let schema = z.string();
  if (config.required) schema = schema.min(1, `${config.label} is required`);
  if (config.minLength) schema = schema.min(config.minLength, `Minimum ${config.minLength} digits`);
  if (config.maxLength) schema = schema.max(config.maxLength, `Maximum ${config.maxLength} digits`);
  return schema;
}

function buildNumberSchema(node: NodeOf<'number'>): z.ZodType {
  const { config } = node;
  let base = z.number();
  if (config.min !== undefined) base = base.min(config.min, `Minimum value is ${config.min}`);
  if (config.max !== undefined) base = base.max(config.max, `Maximum value is ${config.max}`);

  // NumberRendererField emits '' for an empty input. Preprocess converts it to
  // undefined so z.number() can produce a meaningful required/type error.
  const inner: z.ZodType = config.required ? base : z.union([base, z.literal('')]);
  return z.preprocess((v) => (v === '' ? undefined : v), inner);
}

function buildTextareaSchema(node: NodeOf<'textarea'>): z.ZodType {
  const { config } = node;
  let schema = z.string();
  if (config.required) schema = schema.min(1, `${config.label} is required`);
  if (config.minLength) schema = schema.min(config.minLength, `Minimum ${config.minLength} characters`);
  if (config.maxLength) schema = schema.max(config.maxLength, `Maximum ${config.maxLength} characters`);
  return schema;
}

function buildCheckboxSchema(node: NodeOf<'checkbox'>): z.ZodType {
  const { config } = node;
  const schema = z.boolean();
  if (config.required) {
    return schema.refine((v) => v === true, `${config.label} is required`);
  }
  return schema;
}

function buildDropdownSchema(node: NodeOf<'dropdown'>): z.ZodType {
  const { config } = node;
  if (config.required) return z.string().min(1, 'Please select an option');
  return z.string();
}

function buildRadioSchema(node: NodeOf<'radio'>): z.ZodType {
  const { config } = node;
  if (config.required) return z.string().min(1, 'Please select an option');
  return z.string();
}

function buildDateSchema(node: NodeOf<'date'>): z.ZodType {
  const { config } = node;
  if (config.required) return z.string().min(1, `${config.label} is required`);
  return z.string();
}

function buildRatingSchema(node: NodeOf<'rating'>): z.ZodType {
  const { config } = node;
  if (config.required) {
    return z.number().min(1, 'Please provide a rating').max(config.maxStars);
  }
  return z.number().min(0).max(config.maxStars);
}

function buildFieldSchema(node: FieldNode): z.ZodType {
  switch (node.fieldType) {
    case 'text':
      return buildTextSchema(node);
    case 'email':
      return buildEmailSchema(node);
    case 'phone':
      return buildPhoneSchema(node);
    case 'number':
      return buildNumberSchema(node);
    case 'textarea':
      return buildTextareaSchema(node);
    case 'checkbox':
      return buildCheckboxSchema(node);
    case 'dropdown':
      return buildDropdownSchema(node);
    case 'radio':
      return buildRadioSchema(node);
    case 'date':
      return buildDateSchema(node);
    case 'rating':
      return buildRatingSchema(node);
    default: {
      const _exhaustive: never = node;
      return _exhaustive;
    }
  }
}

export function buildZodSchema(schema: NormalizedSchema): z.ZodType {
  const shape: Record<string, z.ZodType> = {};

  for (const node of Object.values(schema.nodes)) {
    if (node.type !== 'field') continue;
    shape[node.id] = buildFieldSchema(node);
  }

  return z.object(shape);
}
