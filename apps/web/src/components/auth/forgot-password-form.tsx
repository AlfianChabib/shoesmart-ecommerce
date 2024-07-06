'use client';

import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthValidation } from '@/validation/auth-validation';
import { ForgotPasswordPayload } from '@/models/auth-model';
import { InputField } from '../form-fields';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth-service';
import { useAlertMessage } from '@/hooks/alert-message';
import Submit from '../molecules/Submit';
import AlertMessage from '../molecules/AlertMessage';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordForm() {
  const { alertMessage, setAlertMessage } = useAlertMessage();
  const router = useRouter();
  const form = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(AuthValidation.forgotPassword),
    defaultValues: { email: '' },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ForgotPasswordPayload) => {
      return await AuthService.forgotPassword(data);
    },
    onSuccess: (res) => {
      setAlertMessage({ type: 'success', message: res.message });
      router.push(`/password/reset?uid=${res.data.userId}`);
    },
    onError: (err) => setAlertMessage({ type: 'error', message: err.message }),
  });

  const onSubmit = (data: ForgotPasswordPayload) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <AlertMessage {...alertMessage} />
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <InputField
            form={form}
            name="email"
            label="Email"
            description="Enter email to reset your pasword"
            type="email"
          />
          <Submit label="Submit" disabled={isPending} />
        </form>
      </Form>
    </div>
  );
}
