import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export interface AlertMessageProps {
  message?: string;
  title?: string;
  type?: 'error' | 'success';
  className?: string;
}

export default function AlertMessage({ message, type, title, className }: AlertMessageProps) {
  if (!message) return null;

  const variant = type === 'error' ? 'destructive' : 'success';

  return (
    <Alert variant={variant} className={cn('p-2', className)}>
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
