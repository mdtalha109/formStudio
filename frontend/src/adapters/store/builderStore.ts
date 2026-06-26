import { create } from 'zustand';
import type {
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

interface BuilderState {
  schema: NormalizedSchema;
  selectedNodeId: NodeId | null;
  addNode: (parentId: NodeId, nodeType: SchemaNode['type'], fieldType?: FieldType, index?: number) => void;
  moveNode: (nodeId: NodeId, targetParentId: NodeId, targetIndex: number) => void;
  updateNodeConfig: <T extends SchemaNode>(nodeId: NodeId, configPatch: Partial<T['config']>) => void;
  removeNode: (nodeId: NodeId) => void;
  selectNode: (nodeId: NodeId | null) => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  schema: sampleSchema,
  selectedNodeId: null,
  addNode: (parentId, nodeType, fieldType, index) =>
    set((state) => ({ schema: addNode(state.schema, parentId, nodeType, fieldType, index) })),
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
