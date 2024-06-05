import { Textarea } from '../ui/textarea';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

export type TextareaFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  description?: string;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'form'>;

export const TextareaField = <TFieldValues extends FieldValues = FieldValues>({
  form,
  name,
  label,
  description,
  ...props
}: TextareaFieldProps<TFieldValues>) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Textarea {...props} {...field} />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
);
