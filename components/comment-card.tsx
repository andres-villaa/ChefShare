import { sanitizeInput } from '@/lib/sanitizer';

interface CommentCardProps {
  userName: string;
  date: string;
  content: string;
}

export function CommentCard({ userName, date, content }: CommentCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <div className="border border-border rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm">{sanitizeInput(userName)}</span>
        <span className="text-xs text-muted-foreground">{formattedDate}</span>
      </div>
      <p className="text-sm text-foreground leading-relaxed">
        {sanitizeInput(content)}
      </p>
    </div>
  );
}
