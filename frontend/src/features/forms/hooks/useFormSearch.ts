import { useMemo, useState } from 'react';
import type { Form } from '@core/domain/entities/Form';

export function useFormSearch(forms: Form[]) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => forms.filter((f) => f.title.toLowerCase().includes(query.toLowerCase())),
    [forms, query],
  );

  return { query, setQuery, filtered };
}
