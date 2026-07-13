import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { useLoginMutation } from '@/api/queries/auth';
import { paths } from '@/routes/paths';

interface LoginForm {
  email: string;
  password: string;
}

export function LoginPage() {
  const methods = useForm<LoginForm>({ defaultValues: { email: '', password: '' } });
  const login = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      await login.mutateAsync(data);
      navigate(paths.dashboard);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      methods.setError('root', { message });
    }
  };

  return (
    <AuthLayout title="Sign in to PM-FE">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <FormField name="email" label="Email" type="email" autoComplete="email" />
          <FormField name="password" label="Password" type="password" autoComplete="current-password" />
          {methods.formState.errors.root && (
            <p className="text-xs text-red-600">{methods.formState.errors.root.message}</p>
          )}
          <Button type="submit" isLoading={login.isPending} className="w-full">
            Sign in
          </Button>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
