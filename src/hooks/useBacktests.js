import { useQuery } from '@tanstack/react-query';
import { fetchBacktests } from '../services/kol';

export const useBacktests = (kolId) => {
  return useQuery({
    queryKey: ['backtests', kolId],
    queryFn: () => fetchBacktests(kolId),
  });
};