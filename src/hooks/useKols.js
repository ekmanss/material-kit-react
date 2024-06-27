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

  const createMutation = useMutation({
    mutationFn: kolService.createKol,
    onSuccess: () => {
      queryClient.invalidateQueries(['kols']);
    },
  });

  return {
    ...query,
    updateKol: updateMutation.mutate,
    deleteKol: deleteMutation.mutate,
    createKol: createMutation.mutate,
    isUpdating: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
    isCreating: createMutation.isLoading,
    updateSuccess: updateMutation.isSuccess,
    deleteSuccess: deleteMutation.isSuccess,
    createSuccess: createMutation.isSuccess,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
    createError: createMutation.error,
  };
};