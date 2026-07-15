import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import type { Condition } from '@core/domain/entities/Condition';
import type { FieldNode } from '@core/domain/entities/SchemaNode';
import { Button, Input, Select } from '@shared/components/ui';
import { logicConfig } from './logicConfig';

interface ConditionRowProps {
  index: number;
  condition: Condition;
  sourceFields: FieldNode[];
  onChange: (updated: Condition) => void;
  onRemove: () => void;
}

function ConditionRow({ index, condition, sourceFields, onChange, onRemove }: ConditionRowProps) {
  const sourceField = sourceFields.find((f) => f.id === condition.sourceFieldId);
  const operators = sourceField ? (logicConfig[sourceField.fieldType] ?? []) : [];
  const selectedOp = operators.find((op) => op.value === condition.operator);

  // Local state for the value input — saves to store on blur to avoid
  // flooding history with one entry per keystroke.
  const [localValue, setLocalValue] = useState(String(condition.value ?? ''));

  useEffect(() => {
    setLocalValue(String(condition.value ?? ''));
  }, [condition.value]);

  function handleSourceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newSourceId = e.target.value;
    const newField = sourceFields.find((f) => f.id === newSourceId);
    const newOps = newField ? (logicConfig[newField.fieldType] ?? []) : [];
    const firstOp = newOps[0];
    onChange({
      sourceFieldId: newSourceId,
      operator: firstOp?.value ?? 'eq',
      value: '',
    });
  }

  function handleOperatorChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newOpValue = e.target.value as Condition['operator'];
    const newOp = operators.find((op) => op.value === newOpValue);
    onChange({
      ...condition,
      operator: newOpValue,
      value: newOp?.hasValue ? localValue : '',
    });
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Select
        id={`logic-source-${index}`}
        label="Source field"
        hideLabel
        value={condition.sourceFieldId}
        options={sourceFields.map((f) => ({ value: f.id, label: f.config.label }))}
        placeholder="Select field"
        onChange={handleSourceChange}
      />
      <div className="flex items-end gap-2">
        <div className="min-w-0 flex-1">
          <Select
            id={`logic-operator-${index}`}
            label="Operator"
            hideLabel
            value={condition.operator}
            options={operators.map((op) => ({ value: op.value, label: op.label }))}
            onChange={handleOperatorChange}
          />
        </div>
        {selectedOp?.hasValue && (
          <div className="min-w-0 flex-1">
            <Input
              id={`logic-value-${index}`}
              label="Value"
              hideLabel
              placeholder="Value"
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
              onBlur={() => onChange({ ...condition, value: localValue })}
            />
          </div>
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0"
          aria-label="Remove condition"
          onClick={onRemove}
        >
          <Trash2 className="size-4" strokeWidth={1.75} />
        </Button>
      </div>
    </div>
  );
}

export default ConditionRow;
