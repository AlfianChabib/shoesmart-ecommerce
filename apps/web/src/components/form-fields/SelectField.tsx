import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

interface SelectOption {
  value: string;
  label: string;
}

export type SelectFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  description?: string;
  options: SelectOption[];
  placeholder?: string;
} & Omit<React.ComponentPropsWithoutRef<'select'>, 'form'>;

export const SelectField = <TFieldValues extends FieldValues = FieldValues>({
  form,
  name,
  ...props
}: SelectFieldProps<TFieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {props.options.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {props.description && <FormDescription>{props.description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
