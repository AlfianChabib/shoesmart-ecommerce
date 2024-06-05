import { Calendar, CalendarProps } from '../ui/calendar';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type DateFieldProps<TFormValues extends FieldValues = FieldValues> = {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  description?: string;
  placeholder?: string;
} & Omit<CalendarProps, 'value' | 'onChange' | 'name' | 'form' | 'className'>;

export const DateField = <TFormValues extends FieldValues = FieldValues>({
  form,
  name,
  ...props
}: DateFieldProps<TFormValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn('min-w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                >
                  {field.value ? format(field.value, 'PPP') : <span>{props.placeholder}</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={props.disabled}
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};
