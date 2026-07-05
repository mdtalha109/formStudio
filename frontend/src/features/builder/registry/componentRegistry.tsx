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
import type {
  CheckboxFieldConfig,
  DateFieldConfig,
  DropdownFieldConfig,
  EmailFieldConfig,
  FieldConfigMap,
  FieldNode,
  FieldType,
  NumberFieldConfig,
  PhoneFieldConfig,
  RadioFieldConfig,
  RatingFieldConfig,
  TextareaFieldConfig,
  TextFieldConfig,
} from '@core/domain/entities/SchemaNode';
import { Checkbox, Input, RadioGroup, Select, Textarea } from '@shared/components/ui';

export type FieldGroup = 'input' | 'selection' | 'other';

// Resolves to the specific FieldNode variant for a given FieldType T.
type TypedFieldNode<T extends FieldType> = Extract<FieldNode, { fieldType: T }>;

interface FieldRegistryEntry<T extends FieldType> {
  displayName: string;
  group: FieldGroup;
  icon: LucideIcon;
  defaultConfig: FieldConfigMap[T];
  Preview: (props: { node: TypedFieldNode<T> }) => ReactElement;
}

// Ensures the registry is exhaustive: every FieldType must have an entry, and
// each entry's defaultConfig + Preview are typed to their specific FieldType.
type ComponentRegistry = { [T in FieldType]: FieldRegistryEntry<T> };

function TextFieldPreview({ node }: { node: TypedFieldNode<'text'> }) {
  const { label, placeholder, required }: TextFieldConfig = node.config;
  return <Input id={node.id} label={label} placeholder={placeholder} required={required} disabled />;
}

function EmailFieldPreview({ node }: { node: TypedFieldNode<'email'> }) {
  const { label, placeholder, required }: EmailFieldConfig = node.config;
  return <Input id={node.id} type="email" label={label} placeholder={placeholder ?? 'you@example.com'} required={required} disabled />;
}

function NumberFieldPreview({ node }: { node: TypedFieldNode<'number'> }) {
  const { label, placeholder, required }: NumberFieldConfig = node.config;
  return <Input id={node.id} type="number" label={label} placeholder={placeholder} required={required} disabled />;
}

function PhoneFieldPreview({ node }: { node: TypedFieldNode<'phone'> }) {
  const { label, placeholder, required }: PhoneFieldConfig = node.config;
  return <Input id={node.id} type="tel" label={label} placeholder={placeholder ?? '+1 (555) 000-0000'} required={required} disabled />;
}

function TextareaFieldPreview({ node }: { node: TypedFieldNode<'textarea'> }) {
  const { label, placeholder, required }: TextareaFieldConfig = node.config;
  return <Textarea id={node.id} label={label} placeholder={placeholder} required={required} disabled />;
}

function CheckboxFieldPreview({ node }: { node: TypedFieldNode<'checkbox'> }) {
  const { label, required }: CheckboxFieldConfig = node.config;
  return <Checkbox id={node.id} label={label} required={required} disabled />;
}

function DropdownFieldPreview({ node }: { node: TypedFieldNode<'dropdown'> }) {
  const { label, options, placeholder, required }: DropdownFieldConfig = node.config;
  return (
    <Select
      id={node.id}
      label={label}
      options={options}
      placeholder={placeholder ?? 'Select an option'}
      required={required}
      disabled
    />
  );
}

function RadioFieldPreview({ node }: { node: TypedFieldNode<'radio'> }) {
  const { label, options, required }: RadioFieldConfig = node.config;
  return <RadioGroup legend={label} name={node.id} options={options} required={required} disabled />;
}

function DateFieldPreview({ node }: { node: TypedFieldNode<'date'> }) {
  const { label, required }: DateFieldConfig = node.config;
  return <Input id={node.id} type="date" label={label} required={required} disabled />;
}

function RatingFieldPreview({ node }: { node: TypedFieldNode<'rating'> }) {
  const { label, required, maxStars }: RatingFieldConfig = node.config;
  return (
    <div>
      <p className="text-foreground mb-1.5 text-sm font-medium">
        {label}
        {required && (
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
export const componentRegistry: ComponentRegistry = {
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
