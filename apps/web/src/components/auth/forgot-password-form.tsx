'use client';

import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthValidation } from '@/validation/auth-validation';
import { ForgotPasswordPayload } from '@/models/auth-model';
import { InputField } from '../form-fields';
import Submit from '../molecules/Submit';

export default function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(AuthValidation.forgotPassword),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: ForgotPasswordPayload) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <InputField form={form} name="email" label="Email" description="Email" type="email" />
          <Submit label="Submit" />
        </form>
      </Form>
    </div>
  );
}
