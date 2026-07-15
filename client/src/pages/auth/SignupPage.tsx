import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { TextField } from '@/components/molecules/TextField';
import { Button } from '@/components/atoms/Button';
import { useSignupMutation } from '@/api/queries/auth';
import { applyFormErrors } from '@/lib/apiError';
import { paths } from '@/routes/paths';

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignupPage() {
  const methods = useForm<SignupForm>({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });
  const signup = useSignupMutation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: SignupForm) => {
      if (data.password !== data.confirmPassword) {
        methods.setError('confirmPassword', { message: 'Passwords do not match' });
        return;
      }
      try {
        await signup.mutateAsync({
          name: data.name.trim(),
          email: data.email.trim(),
          password: data.password,
          confirmPassword: data.confirmPassword,
          remember: true,
        });
        navigate(paths.dashboard, { replace: true });
      } catch (err) {
        applyFormErrors(err, methods.setError, 'Signup failed');
      }
    },
    [methods, navigate, signup],
  );

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start your journey with us today."
      withIllustration
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <TextField
            name="name"
            label="Full Name:"
            placeholder="John Doe"
            autoComplete="name"
          />
          <TextField
            name="email"
            label="Email:"
            type="email"
            placeholder="email@gmail.com"
            autoComplete="email"
          />
          <TextField
            name="password"
            label="Password:"
            type="password"
            placeholder="Enter your Password"
            autoComplete="new-password"
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password:"
            type="password"
            placeholder="Confirm your Password"
            autoComplete="new-password"
          />

          {methods.formState.errors.root && (
            <p role="alert" className="text-xs text-red-500">
              {methods.formState.errors.root.message}
            </p>
          )}

          <Button
            type="submit"
            isLoading={signup.isPending}
            className="w-full rounded-full bg-gradient-to-r from-brand-orange to-amber-500 py-3.5 font-bold text-white shadow-lg shadow-brand-orange/20 hover:from-brand-orange-hover hover:to-amber-600 hover:shadow-[0_0_20px_rgba(249,152,35,0.4)] hover:-translate-y-0.5 transition-all duration-300 active:scale-98"
          >
            Create Account
          </Button>
        </form>
      </FormProvider>

      <div className="mt-8 border-t border-border-light pt-6 text-center dark:border-border-dark">
        <p className="text-sm font-semibold text-text-muted-light dark:text-text-muted-dark">
          Already have an account?{' '}
          <Link
            to={paths.login}
            className="font-bold text-brand-blue transition-colors hover:text-brand-blue-hover"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

