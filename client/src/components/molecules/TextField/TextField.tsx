import { type ReactNode, useId, useState } from 'react';
import { useFormContext, Controller, type FieldValues, type Path } from 'react-hook-form';
import { Input } from '@/components/atoms/Input';
import { Eye, EyeOff } from '@/components/atoms/icons';
import { cn } from '@/lib/cn';

export interface TextFieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  icon?: ReactNode;
  autoComplete?: string;
  disabled?: boolean;
}

export function TextField<T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder,
  icon,
  autoComplete,
  disabled,
}: TextFieldProps<T>) {
  const id = useId();
  const errorId = `${id}-error`;
  const { control } = useFormContext<T>();
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === 'password';
  const inputType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-1.5 text-left">
      <label
        htmlFor={id}
        className="block text-sm font-semibold tracking-wide text-text-main-light/90 dark:text-text-main-dark/95"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-text-muted-light/60 dark:text-text-muted-dark/50">
            {icon}
          </div>
        )}
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState }) => {
            const hasError = Boolean(fieldState.error);
            return (
              <>
                <Input
                  id={id}
                  type={inputType}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  disabled={disabled}
                  hasError={hasError}
                  aria-invalid={hasError || undefined}
                  aria-describedby={hasError ? errorId : undefined}
                  className={cn(
                    'h-12 w-full rounded-xl px-4 text-sm transition-all duration-300 border focus:outline-none focus:ring-4',
                    'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-brand-blue focus:ring-brand-blue/10',
                    'dark:bg-[#0c101a]/70 dark:border-slate-800/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-[#0c101a]/95 dark:focus:border-brand-orange/85 dark:focus:ring-brand-orange/15',
                    icon && 'pl-11',
                    isPasswordType && 'pr-11',
                    hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500/15',
                  )}
                  {...field}
                  value={(field.value as string | number | undefined) ?? ''}
                />
                {isPasswordType && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-text-muted-light/50 hover:text-text-main-light dark:text-text-muted-dark/40 dark:hover:text-text-main-dark transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                )}
                {fieldState.error?.message && (
                  <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            );
          }}
        />
      </div>
    </div>
  );
}

