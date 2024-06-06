'use client';

import { Form } from '../ui/form';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { InputField } from '../form-fields';
import { queryClient } from '@/lib/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth-service';
import { LoginPayload } from '@/models/auth-model';
import { AuthValidation } from '@/validation/auth-validation';
import { useAlertMessage } from '@/hooks/alert-message';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Submit from '../molecules/Submit';
import AlertMessage from '../molecules/AlertMessage';
import SocialButton from './SocialButton';

export default function SignInForm() {
  const { alertMessage, setAlertMessage } = useAlertMessage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const accessToken = searchParams.get('accessToken') || '';

  useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem('accessToken', accessToken);
      router.push('/');
      queryClient.invalidateQueries({ queryKey: ['session'] });
    }
  }, [accessToken, router]);

  const form = useForm<LoginPayload>({
    resolver: zodResolver(AuthValidation.login),
    defaultValues: { email: '', password: '' },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginPayload) => AuthService.signIn(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      sessionStorage.setItem('accessToken', res.accessToken);
      router.push('/');
    },
    onError: (error) => setAlertMessage({ type: 'error', message: error.message }),
  });

  const onSubmit = (data: LoginPayload) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <AlertMessage {...alertMessage} />
      <Form {...form}>
        <form className="flex flex-col gap-2 md:gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <InputField form={form} name="email" label="Email" type="email" />
          <InputField form={form} name="password" label="Password" type="password" autoComplete="off" />
          <Link href="/password/forgot" className="text-foreground/60 text-center text-sm">
            Forgot your password?
          </Link>
          <Submit label="Sign In" disabled={isPending} />
        </form>
      </Form>
      <div className="relative flex w-full flex-col items-center justify-center">
        <p className="text-foreground/90 bg-background z-10 px-2">OR CONTINUE WITH</p>
        <span className="border-foreground/70 absolute w-full border-b" />
      </div>
      <SocialButton provider="google" />
    </div>
  );
}
