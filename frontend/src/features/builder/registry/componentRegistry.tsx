/* eslint-disable react-refresh/only-export-components */
import {
  AlignLeft,
  Calendar,
  CheckSquare,
  ChevronDown,
  CircleDot,
  Hash,
  Mail,
  Phone,
  Star,
  Type,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactElement } from 'react';
import type { FieldConfig, FieldNode, FieldType } from '@core/domain/entities/SchemaNode';
import { Checkbox, Input, RadioGroup, Select, Textarea } from '@shared/components/ui';

export type FieldGroup = 'input' | 'selection' | 'other';

interface FieldRegistryEntry {
  displayName: string;
  group: FieldGroup;
  icon: LucideIcon;
  defaultConfig: FieldConfig;
  Preview: (props: { node: FieldNode }) => ReactElement;
}

// ─── Input field previews ────────────────────────────────────────────────────

function TextFieldPreview({ node }: { node: FieldNode }) {
  return (
    <Input id={node.id} label={node.config.label} placeholder={node.config.placeholder} required={node.config.required} disabled />
  );
}

function EmailFieldPreview({ node }: { node: FieldNode }) {
  return (
    <Input id={node.id} type="email" label={node.config.label} placeholder={node.config.placeholder ?? 'you@example.com'} required={node.config.required} disabled />
  );
}

function NumberFieldPreview({ node }: { node: FieldNode }) {
  return (
    <Input id={node.id} type="number" label={node.config.label} placeholder={node.config.placeholder} required={node.config.required} disabled />
  );
}

function PhoneFieldPreview({ node }: { node: FieldNode }) {
  return (
    <Input id={node.id} type="tel" label={node.config.label} placeholder={node.config.placeholder ?? '+1 (555) 000-0000'} required={node.config.required} disabled />
  );
}

function TextareaFieldPreview({ node }: { node: FieldNode }) {
  return (
    <Textarea id={node.id} label={node.config.label} placeholder={node.config.placeholder} required={node.config.required} disabled />
  );
}

// ─── Selection field previews ────────────────────────────────────────────────

function CheckboxFieldPreview({ node }: { node: FieldNode }) {
  return <Checkbox id={node.id} label={node.config.label} required={node.config.required} disabled />;
}

function DropdownFieldPreview({ node }: { node: FieldNode }) {
  return (
    <Select
      id={node.id}
      label={node.config.label}
      options={node.config.options ?? []}
      placeholder={node.config.placeholder ?? 'Select an option'}
      required={node.config.required}
      disabled
    />
  );
}

function RadioFieldPreview({ node }: { node: FieldNode }) {
  return (
    <RadioGroup
      legend={node.config.label}
      name={node.id}
      options={node.config.options ?? []}
      required={node.config.required}
      disabled
    />
  );
}

// ─── Other field previews ─────────────────────────────────────────────────────

function DateFieldPreview({ node }: { node: FieldNode }) {
  return (
    <Input id={node.id} type="date" label={node.config.label} required={node.config.required} disabled />
  );
}

function RatingFieldPreview({ node }: { node: FieldNode }) {
  const maxStars = node.config.maxStars ?? 5;
  return (
    <div>
      <p className="text-foreground mb-1.5 text-sm font-medium">
        {node.config.label}
        {node.config.required && (
          <span className="text-danger ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </p>
      <div className="flex gap-1">
        {Array.from({ length: maxStars }, (_, i) => (
          <Star key={i} className="text-muted-foreground size-5" strokeWidth={1.5} />
        ))}
      </div>
    </div>
  );
}

// ─── Registry ────────────────────────────────────────────────────────────────

export const componentRegistry: Record<FieldType, FieldRegistryEntry> = {
  // Input fields
  text: {
    displayName: 'Text Input',
    group: 'input',
    icon: Type,
    defaultConfig: { label: 'Untitled field', required: false },
    Preview: TextFieldPreview,
  },
  email: {
    displayName: 'Email',
    group: 'input',
    icon: Mail,
    defaultConfig: { label: 'Email', required: false },
    Preview: EmailFieldPreview,
  },
  number: {
    displayName: 'Number',
    group: 'input',
    icon: Hash,
    defaultConfig: { label: 'Number', required: false },
    Preview: NumberFieldPreview,
  },
  phone: {
    displayName: 'Phone',
    group: 'input',
    icon: Phone,
    defaultConfig: { label: 'Phone', required: false },
    Preview: PhoneFieldPreview,
  },
  textarea: {
    displayName: 'Textarea',
    group: 'input',
    icon: AlignLeft,
    defaultConfig: { label: 'Untitled field', required: false },
    Preview: TextareaFieldPreview,
  },
  // Selection fields
  checkbox: {
    displayName: 'Checkbox',
    group: 'selection',
    icon: CheckSquare,
    defaultConfig: { label: 'Untitled checkbox', required: false },
    Preview: CheckboxFieldPreview,
  },
  dropdown: {
    displayName: 'Dropdown',
    group: 'selection',
    icon: ChevronDown,
    defaultConfig: {
      label: 'Select one',
      required: false,
      options: [
        { label: 'Option 1', value: 'option_1' },
        { label: 'Option 2', value: 'option_2' },
      ],
    },
    Preview: DropdownFieldPreview,
  },
  radio: {
    displayName: 'Radio Group',
    group: 'selection',
    icon: CircleDot,
    defaultConfig: {
      label: 'Select one',
      required: false,
      options: [
        { label: 'Option 1', value: 'option_1' },
        { label: 'Option 2', value: 'option_2' },
      ],
    },
    Preview: RadioFieldPreview,
  },
  // Other fields
  date: {
    displayName: 'Date',
    group: 'other',
    icon: Calendar,
    defaultConfig: { label: 'Date', required: false },
    Preview: DateFieldPreview,
  },
  rating: {
    displayName: 'Rating',
    group: 'other',
    icon: Star,
    defaultConfig: { label: 'Rating', required: false, maxStars: 5 },
    Preview: RatingFieldPreview,
  },
};
