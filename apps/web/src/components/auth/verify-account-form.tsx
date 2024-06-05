'use client';

import { Form } from '../ui/form';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth-service';
import { AuthValidation } from '@/validation/auth-validation';
import { useAlertMessage } from '@/hooks/alert-message';
import { VerificationPayload } from '@/models/auth-model';
import { InputField } from '../form-fields';
import Submit from '../molecules/Submit';
import AlertMessage from '../molecules/AlertMessage';

interface VerifyAccountFormProps {
  token: string;
}

export default function VerifyAccountForm({ token }: VerifyAccountFormProps) {
  const { alertMessage, setAlertMessage } = useAlertMessage();
  const router = useRouter();

  const form = useForm<VerificationPayload>({
    resolver: zodResolver(AuthValidation.verification),
    defaultValues: { token, password: '', confirmPassword: '' },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: VerificationPayload) => await AuthService.accountVerification(data),
    onSuccess: (res) => {
      toast.success(res.message);
      form.reset();
      router.push('/sign-in');
    },
    onError: (error) => setAlertMessage({ message: error.message, type: 'error' }),
  });

  const onSubmit = (data: VerificationPayload) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <AlertMessage {...alertMessage} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputField
            form={form}
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your new password"
          />
          <InputField
            form={form}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Retype your new password"
          />
          <Submit label="Activate" disabled={isPending} />
        </form>
      </Form>
    </div>
  );
}
