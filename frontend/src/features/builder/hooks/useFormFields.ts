import { useShallow } from 'zustand/react/shallow';
import { useBuilderStore } from '@adapters/store/builderStore';
import type { FieldNode } from '@core/domain/entities/SchemaNode';

export function useFormFields(): FieldNode[] {
  return useBuilderStore(
    useShallow((state) =>
      Object.values(state.schema.nodes).filter((node): node is FieldNode => node.type === 'field'),
    ),
  );
}
