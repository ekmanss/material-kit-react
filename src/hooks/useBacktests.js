import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as kolService from '../services/kol';

export const useBacktests = (kolId) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['backtests', kolId],
    queryFn: () => kolService.fetchBacktests(kolId),
  });

  const updateMutation = useMutation({
    mutationFn: kolService.updateBacktest,
    onSuccess: () => {
      queryClient.invalidateQueries(['backtests', kolId]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: kolService.deleteBacktest,
    onSuccess: () => {
      queryClient.invalidateQueries(['backtests', kolId]);
    },
  });

  return {
    ...query,
    updateBacktest: updateMutation.mutate,
    deleteBacktest: deleteMutation.mutate,
    isUpdating: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
    updateSuccess: updateMutation.isSuccess,
    deleteSuccess: deleteMutation.isSuccess,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
};