import { create } from 'zustand';
import type {
  FieldConfigPatch,
  FieldType,
  NodeId,
  NormalizedSchema,
  SchemaNode,
} from '@core/domain/entities/SchemaNode';
import { addNode } from '@core/usecases/builder/addNode';
import { moveNode } from '@core/usecases/builder/moveNode';
import { removeNode } from '@core/usecases/builder/removeNode';
import { sampleSchema } from '@core/usecases/builder/sampleSchema';
import { updateNodeConfig } from '@core/usecases/builder/updateNodeConfig';
import { componentRegistry } from '@features/builder/registry/componentRegistry';

interface BuilderState {
  schema: NormalizedSchema;
  selectedNodeId: NodeId | null;
  addNode: (parentId: NodeId, nodeType: SchemaNode['type'], fieldType?: FieldType, index?: number) => void;
  moveNode: (nodeId: NodeId, targetParentId: NodeId, targetIndex: number) => void;
  updateNodeConfig: (nodeId: NodeId, configPatch: FieldConfigPatch) => void;
  removeNode: (nodeId: NodeId) => void;
  selectNode: (nodeId: NodeId | null) => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  schema: sampleSchema,
  selectedNodeId: null,
  addNode: (parentId, nodeType, fieldType, index) => {
    // Look up the registry default so each field type starts with correct config
    // (e.g. dropdown gets its options array, rating gets maxStars).
    const defaultConfig = fieldType ? componentRegistry[fieldType].defaultConfig : undefined;
    set((state) => ({
      schema: addNode(state.schema, parentId, nodeType, fieldType, index, defaultConfig),
    }));
  },
  moveNode: (nodeId, targetParentId, targetIndex) =>
    set((state) => ({ schema: moveNode(state.schema, nodeId, targetParentId, targetIndex) })),
  updateNodeConfig: (nodeId, configPatch) =>
    set((state) => ({ schema: updateNodeConfig(state.schema, nodeId, configPatch) })),
  removeNode: (nodeId) =>
    set((state) => ({
      schema: removeNode(state.schema, nodeId),
      selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
    })),
  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),
}));
