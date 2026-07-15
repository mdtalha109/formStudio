import type { VisibilityRule } from '@core/domain/entities/Condition';
import { evaluateCondition } from './evaluateCondition';

export function resolveVisibility(
  rule: VisibilityRule,
  formValues: Record<string, unknown>,
): boolean {
  if (rule.conditions.length === 0) return true;

  const results = rule.conditions.map((c) => evaluateCondition(c, formValues));
  return rule.matchAll ? results.every(Boolean) : results.some(Boolean);
}
