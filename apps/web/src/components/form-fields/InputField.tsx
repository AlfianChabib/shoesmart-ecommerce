import { Input } from '../ui/input';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

export type InputFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  description?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'form'>;

export const InputField = <TFieldValues extends FieldValues = FieldValues>({
  label,
  description,
  name,
  form,
  ...props
}: InputFieldProps<TFieldValues>) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-1">
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Input {...props} {...field} />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
);
