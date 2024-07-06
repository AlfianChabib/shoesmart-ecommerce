'use client';

import Submit from '../molecules/Submit';
import AlertMessage from '../molecules/AlertMessage';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthValidation } from '@/validation/auth-validation';
import { useAlertMessage } from '@/hooks/alert-message';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { ValidateOTPPayload } from '@/models/auth-model';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

type ValidateOTPFormProps = {
  userId: string;
};

export default function ValidateOTPForm({ userId }: ValidateOTPFormProps) {
  const { alertMessage, setAlertMessage } = useAlertMessage();

  const form = useForm<ValidateOTPPayload>({
    resolver: zodResolver(AuthValidation.validateOTP),
    defaultValues: { otp: '', userId: userId },
  });

  const onSubmit = (data: ValidateOTPPayload) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <AlertMessage {...alertMessage} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field} autoFocus>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>Please enter the one-time password sent to your email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Submit />
        </form>
      </Form>
    </div>
  );
}
