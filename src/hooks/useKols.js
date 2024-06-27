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

  return {
    ...query,
    updateKol: updateMutation.mutate,
    isUpdating: updateMutation.isLoading,
  };
};