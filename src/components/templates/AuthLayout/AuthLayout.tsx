import type { ReactNode } from 'react';
import { Typography } from '@/components/atoms/Typography';

export interface AuthLayoutProps {
  title: string;
  children: ReactNode;
}

export function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50 p-4">
      <div className="w-full max-w-md rounded-lg border border-surface-200 bg-white p-6 shadow-sm">
        <Typography variant="h2" className="mb-6 text-center">
          {title}
        </Typography>
        {children}
      </div>
    </div>
  );
}
