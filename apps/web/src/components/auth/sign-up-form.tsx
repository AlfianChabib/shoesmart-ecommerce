'use client';

import { Form } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth-service';
import { AuthValidation } from '@/validation/auth-validation';
import { useAlertMessage } from '@/hooks/alert-message';
import { RegisterPayload } from '@/models/auth-model';
import { InputField } from '../form-fields';
import Submit from '../molecules/Submit';
import SocialButton from './SocialButton';
import AlertMessage from '../molecules/AlertMessage';

export default function SignUpForm() {
  const { alertMessage, setAlertMessage } = useAlertMessage();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterPayload) => await AuthService.register(data),
    onSuccess: (res) => {
      setAlertMessage({ message: res.message, type: 'success' });
      form.reset();
    },
    onError: (error) => setAlertMessage({ message: error.message, type: 'error' }),
  });

  const form = useForm<RegisterPayload>({
    resolver: zodResolver(AuthValidation.register),
    defaultValues: { email: '', username: '' },
  });

  const onSubmit = (data: RegisterPayload) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <AlertMessage {...alertMessage} />
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <InputField form={form} name="email" label="Email" type="email" placeholder="eg. me@example.com" />
          <InputField form={form} name="username" label="Username" type="text" placeholder="eg. john doe" />
          <Submit variant="default" label="Sign Up With Email" disabled={isPending} />
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
