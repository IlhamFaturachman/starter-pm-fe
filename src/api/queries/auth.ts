import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { useAuthStore } from '@/store/authStore';
import type { AuthResponse } from '@/types/api';

export interface LoginPayload {
  email: string;
  password: string;
}

export function useLoginMutation() {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
      return data;
    },
    onSuccess: ({ token, user }) => setAuth(token, user),
  });
}
