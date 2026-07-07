import { create } from 'zustand';
import type {
  FieldConfigPatch,
  FieldType,
  NodeId,
  NormalizedSchema,
  RowConfig,
  ColumnConfig,
  SchemaNode,
} from '@core/domain/entities/SchemaNode';
import { addNode } from '@core/usecases/builder/addNode';
import { moveNode } from '@core/usecases/builder/moveNode';
import { removeNode } from '@core/usecases/builder/removeNode';
import { sampleSchema } from '@core/usecases/builder/sampleSchema';
import { updateNodeConfig } from '@core/usecases/builder/updateNodeConfig';
import { componentRegistry } from '@features/builder/registry/componentRegistry';

const MAX_HISTORY = 50;

interface BuilderState {
  schema: NormalizedSchema;
  past: NormalizedSchema[];
  future: NormalizedSchema[];
  selectedNodeId: NodeId | null;
  hydrateSchema: (schema: NormalizedSchema) => void;
  addRow: (sectionId: NodeId) => void;
  addNode: (parentId: NodeId, nodeType: SchemaNode['type'], fieldType?: FieldType, index?: number) => void;
  moveNode: (nodeId: NodeId, targetParentId: NodeId, targetIndex: number) => void;
  updateNodeConfig: (nodeId: NodeId, configPatch: FieldConfigPatch) => void;
  removeNode: (nodeId: NodeId) => void;
  selectNode: (nodeId: NodeId | null) => void;
  undo: () => void;
  redo: () => void;
}

// Returns the history fields to merge into state when a mutation fires.
// Pushes current schema onto past (capped at MAX_HISTORY) and clears future.
function pushHistory(state: BuilderState, nextSchema: NormalizedSchema) {
  return {
    schema: nextSchema,
    past: [...state.past, state.schema].slice(-MAX_HISTORY),
    future: [] as NormalizedSchema[],
  };
}

export const useBuilderStore = create<BuilderState>((set) => ({
  schema: sampleSchema,
  past: [],
  future: [],
  selectedNodeId: null,

  // Hydration from the server resets history — past edits from another session are irrelevant.
  hydrateSchema: (schema) => set({ schema, past: [], future: [], selectedNodeId: null }),

  // Row + its first column are one logical operation → single history entry.
  addRow: (sectionId) =>
    set((state) => {
      const section = state.schema.nodes[sectionId];
      if (!section) return state;
      const rowId = crypto.randomUUID() as NodeId;
      const columnId = crypto.randomUUID() as NodeId;
      const rowConfig: RowConfig = {};
      const columnConfig: ColumnConfig = {};
      const nextNodes = {
        ...state.schema.nodes,
        [sectionId]: { ...section, childIds: [...section.childIds, rowId] },
        [rowId]: { id: rowId, parentId: sectionId, childIds: [columnId], type: 'row' as const, config: rowConfig },
        [columnId]: { id: columnId, parentId: rowId, childIds: [], type: 'column' as const, config: columnConfig },
      };
      return pushHistory(state, { ...state.schema, nodes: nextNodes });
    }),

  addNode: (parentId, nodeType, fieldType, index) => {
    // Look up the registry default so each field type starts with correct config
    // (e.g. dropdown gets its options array, rating gets maxStars).
    const defaultConfig = fieldType ? componentRegistry[fieldType].defaultConfig : undefined;
    set((state) =>
      pushHistory(state, addNode(state.schema, parentId, nodeType, fieldType, index, defaultConfig)),
    );
  },

  moveNode: (nodeId, targetParentId, targetIndex) =>
    set((state) =>
      pushHistory(state, moveNode(state.schema, nodeId, targetParentId, targetIndex)),
    ),

  updateNodeConfig: (nodeId, configPatch) =>
    set((state) => pushHistory(state, updateNodeConfig(state.schema, nodeId, configPatch))),

  removeNode: (nodeId) =>
    set((state) => ({
      ...pushHistory(state, removeNode(state.schema, nodeId)),
      selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
    })),

  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),

  undo: () =>
    set((state) => {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      return {
        schema: previous,
        past: state.past.slice(0, -1),
        future: [state.schema, ...state.future],
        selectedNodeId: null,
      };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return {
        schema: next,
        past: [...state.past, state.schema].slice(-MAX_HISTORY),
        future: state.future.slice(1),
        selectedNodeId: null,
      };
    }),
}));
