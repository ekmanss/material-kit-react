import { useQuery } from '@tanstack/react-query';
import * as kolService from '../services/kol';

export const useKols = () => useQuery({
    queryKey: ['kols'],
    queryFn: kolService.fetchKols,
  });

export const useKol = (id) => useQuery({
    queryKey: ['user', id],
    queryFn: () => kolService.fetchUserById(id),
    enabled: !!id,
  });

// 如需添加、更新或删除用户，可以添加相应的 mutation hooks