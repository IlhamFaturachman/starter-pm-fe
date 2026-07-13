import { create } from 'zustand';

interface Toast {
  id: string;
  message: string;
  tone: 'info' | 'success' | 'warning' | 'danger';
}

interface UiState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  toasts: Toast[];
  toggleSidebar: () => void;
  setTheme: (t: 'light' | 'dark') => void;
  pushToast: (t: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: true,
  theme: 'light',
  toasts: [],
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
  pushToast: (t) =>
    set((s) => ({
      toasts: [...s.toasts, { ...t, id: crypto.randomUUID() }],
    })),
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
