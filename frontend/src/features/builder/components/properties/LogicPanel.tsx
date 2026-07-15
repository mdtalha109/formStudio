import { Plus } from 'lucide-react';
import { useBuilderStore } from '@adapters/store/builderStore';
import type { Condition, VisibilityRule } from '@core/domain/entities/Condition';
import type { FieldNode } from '@core/domain/entities/SchemaNode';
import { useFormFields } from '@features/builder/hooks/useFormFields';
import { Button } from '@shared/components/ui';
import { cn } from '@shared/utils/cn';
import ConditionRow from './ConditionRow';
import { logicConfig } from './logicConfig';

interface LogicPanelProps {
  node: FieldNode;
}

function LogicPanel({ node }: LogicPanelProps) {
  const updateNodeConfig = useBuilderStore((state) => state.updateNodeConfig);
  const allFields = useFormFields();
  const sourceFields = allFields.filter((f) => f.id !== node.id);

  const rule: VisibilityRule = node.config.visibilityRule ?? { matchAll: true, conditions: [] };

  function save(updated: VisibilityRule) {
    updateNodeConfig(node.id, { visibilityRule: updated });
  }

  function handleAddCondition() {
    const firstField = sourceFields[0];
    if (!firstField) return;
    const ops = logicConfig[firstField.fieldType] ?? [];
    const firstOp = ops[0];
    const newCondition: Condition = {
      sourceFieldId: firstField.id,
      operator: firstOp?.value ?? 'eq',
      value: '',
    };
    save({ ...rule, conditions: [...rule.conditions, newCondition] });
  }

  function handleConditionChange(index: number, updated: Condition) {
    const conditions = rule.conditions.map((c, i) => (i === index ? updated : c));
    save({ ...rule, conditions });
  }

  function handleRemoveCondition(index: number) {
    const conditions = rule.conditions.filter((_, i) => i !== index);
    save({ ...rule, conditions });
  }

  if (sourceFields.length === 0) {
    return (
      <p className="text-muted-foreground px-4 py-6 text-sm">
        Add more fields to the form to configure conditional logic.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <p className="text-muted-foreground text-xs">Show this field when…</p>

      {rule.conditions.length > 1 && (
        <div className="border-border flex gap-1 rounded-md border p-0.5">
          <Button
            type="button"
            variant={rule.matchAll ? 'primary' : 'ghost'}
            size="sm"
            className={cn('flex-1', !rule.matchAll && 'text-muted-foreground')}
            onClick={() => save({ ...rule, matchAll: true })}
          >
            All conditions
          </Button>
          <Button
            type="button"
            variant={!rule.matchAll ? 'primary' : 'ghost'}
            size="sm"
            className={cn('flex-1', rule.matchAll && 'text-muted-foreground')}
            onClick={() => save({ ...rule, matchAll: false })}
          >
            Any condition
          </Button>
        </div>
      )}

      {rule.conditions.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No conditions yet — this field is always visible.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {rule.conditions.map((condition, index) => (
            <ConditionRow
              key={index}
              index={index}
              condition={condition}
              sourceFields={sourceFields}
              onChange={(updated) => handleConditionChange(index, updated)}
              onRemove={() => handleRemoveCondition(index)}
            />
          ))}
        </div>
      )}

      <Button
        type="button"
        variant="ghost"
        size="sm"
        leftIcon={<Plus className="size-3.5" strokeWidth={1.75} />}
        onClick={handleAddCondition}
      >
        Add condition
      </Button>
    </div>
  );
}

export default LogicPanel;
