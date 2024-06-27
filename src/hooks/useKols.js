import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as kolService from '../services/kol';

export const useKols = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['kols'],
    queryFn: kolService.fetchKols,
  });

  const updateMutation = useMutation({
    mutationFn: kolService.updateKol,
    onSuccess: () => {
      queryClient.invalidateQueries(['kols']);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: kolService.deleteKol,
    onSuccess: () => {
      queryClient.invalidateQueries(['kols']);
    },
  });

  return {
    ...query,
    updateKol: updateMutation.mutate,
    deleteKol: deleteMutation.mutate,
    isUpdating: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
    updateSuccess: updateMutation.isSuccess,
    deleteSuccess: deleteMutation.isSuccess,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
};