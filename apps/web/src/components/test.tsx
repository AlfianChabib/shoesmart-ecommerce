'use client';

import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { DateField } from './form-fields/DateField';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField, SelectField, TextareaField } from '@/components/form-fields';
import Submit from '@/components/molecules/Submit';

const schema = z.object({
  emailInput: z.string().email({ message: 'Invalid email address' }),
  passwordInput: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  textarea: z.string().min(5, { message: 'Textarea must be at least 5 characters' }),
  select: z.string({ required_error: 'Select is required' }),
  date: z.date({ required_error: 'Date is required' }),
});

const selectOptions = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3' },
];

export default function Test() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { emailInput: '', passwordInput: '', textarea: '', select: '', date: undefined },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    toast.info(JSON.stringify(data, null, 2));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-lg space-y-2">
        <InputField form={form} name="emailInput" label="Email" type="email" />
        <InputField form={form} name="passwordInput" label="Password" type="password" autoComplete="off" />
        <SelectField form={form} name="select" label="Select" placeholder="Select" options={selectOptions} />
        <TextareaField form={form} name="textarea" label="Textarea" />
        <DateField
          form={form}
          name="date"
          label="Date"
          placeholder="Select date"
          disabled={(date) => date < new Date() || date > new Date(2030, 1, 1)}
        />
        <Submit label="Submit" />
        <Button onClick={() => form.reset()}>Reset</Button>
      </form>
    </Form>
  );
}
