import { useEffect } from 'react';
import { useAppDispatch } from '@adapters/store/hooks';
import { restoreSession } from '@adapters/store/authSlice';

export function useAuthBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);
}
