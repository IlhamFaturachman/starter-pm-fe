import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { router } from '@/routes/router';
import { queryClient } from '@/api/queryClient';
import { SocketProvider } from '@/sockets/SocketProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
