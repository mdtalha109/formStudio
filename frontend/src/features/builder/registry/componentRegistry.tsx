/* eslint-disable react-refresh/only-export-components */
import { AlignLeft, CheckSquare, Type } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactElement } from 'react';
import type { FieldConfig, FieldNode, FieldType } from '@core/domain/entities/SchemaNode';
import { Checkbox, Input, Textarea } from '@shared/components/ui';

interface FieldRegistryEntry {
  displayName: string;
  icon: LucideIcon;
  defaultConfig: FieldConfig;
  Preview: (props: { node: FieldNode }) => ReactElement;
}

function TextFieldPreview({ node }: { node: FieldNode }) {
  return (
    <Input
      id={node.id}
      label={node.config.label}
      placeholder={node.config.placeholder}
      required={node.config.required}
      disabled
    />
  );
}

function TextareaFieldPreview({ node }: { node: FieldNode }) {
  return (
    <Textarea
      id={node.id}
      label={node.config.label}
      placeholder={node.config.placeholder}
      required={node.config.required}
      disabled
    />
  );
}

function CheckboxFieldPreview({ node }: { node: FieldNode }) {
  return <Checkbox id={node.id} label={node.config.label} required={node.config.required} disabled />;
}

export const componentRegistry: Record<FieldType, FieldRegistryEntry> = {
  text: {
    displayName: 'Text Input',
    icon: Type,
    defaultConfig: { label: 'Untitled field', required: false },
    Preview: TextFieldPreview,
  },
  textarea: {
    displayName: 'Textarea',
    icon: AlignLeft,
    defaultConfig: { label: 'Untitled field', required: false },
    Preview: TextareaFieldPreview,
  },
  checkbox: {
    displayName: 'Checkbox',
    icon: CheckSquare,
    defaultConfig: { label: 'Untitled checkbox', required: false },
    Preview: CheckboxFieldPreview,
  },
};
