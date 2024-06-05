import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '../ui/button';

interface SubmitProps extends ButtonProps {
  label?: string;
}

export default function Submit({ label, ...props }: SubmitProps) {
  return (
    <Button type="submit" {...props} className={cn(props.className)}>
      <span>{label ? label : 'Submit'}</span>
    </Button>
  );
}
