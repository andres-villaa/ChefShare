import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';

interface AlertBannerProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

export function AlertBanner({ type, message, onClose }: AlertBannerProps) {
  const icons = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertCircle,
    info: Info
  };
  
  const Icon = icons[type];
  
  return (
    <Alert className={`mb-4 ${type === 'error' ? 'border-destructive' : ''}`}>
      <Icon className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground ml-4"
            aria-label="Close alert"
          >
            ×
          </button>
        )}
      </AlertDescription>
    </Alert>
  );
}
