// src/hooks/useGetPrice.js
import { useMutation } from '@tanstack/react-query';
import * as priceService from '../services/price';

export const useGetPrice = () => {
  const { mutate, isLoading, error } = useMutation({
    mutationFn: priceService.getPrice,
  });

  const getPrice = (params) => {
    return new Promise((resolve, reject) => {
      mutate(params, {
        onSuccess: (result) => resolve(result),
        onError: (error) => reject(error),
      });
    });
  };

  return {
    getPrice,
    isLoading,
    error,
  };
};