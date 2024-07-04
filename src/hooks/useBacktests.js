import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as kolService from '../services/kol';

export const useBacktests = (kolId) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['backtests', kolId],
    queryFn: () => kolService.fetchBacktests(kolId),
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3; // 其他错误最多重试 3 次
    },
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

  const createMutation = useMutation({
    mutationFn: kolService.createBacktest,
    onSuccess: () => {
      queryClient.invalidateQueries(['backtests', kolId]);
    },
  });

  const uploadMutation = useMutation({
    mutationFn: kolService.uploadBacktestResults,
    onSuccess: () => {
      queryClient.invalidateQueries(['backtests', kolId]);
    },
  });

  const updateBacktest = (data) => {
    return new Promise((resolve, reject) => {
      updateMutation.mutate(data, {
        onSuccess: (result) => resolve(result),
        onError: (error) => reject(error),
      });
    });
  };

  const deleteBacktest = (id) => {
    return new Promise((resolve, reject) => {
      deleteMutation.mutate(id, {
        onSuccess: (result) => resolve(result),
        onError: (error) => reject(error),
      });
    });
  };

  const createBacktest = (data) => {
    return new Promise((resolve, reject) => {
      createMutation.mutate(data, {
        onSuccess: (result) => resolve(result),
        onError: (error) => reject(error),
      });
    });
  };

  const uploadBacktestResults = (formData) => {
    return new Promise((resolve, reject) => {
      uploadMutation.mutate(formData, {
        onSuccess: (result) => resolve(result),
        onError: (error) => reject(error),
      });
    });
  };

  return {
    ...query,
    updateBacktest,
    deleteBacktest,
    createBacktest,
    uploadBacktestResults,
    isUpdating: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
    isCreating: createMutation.isLoading,
    isUploading: uploadMutation.isLoading,
  };
};