import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, User } from 'lucide-react';
import { sanitizeInput } from '@/lib/sanitizer';

interface ForumThreadCardProps {
  id: string;
  title: string;
  authorName: string;
  commentCount: number;
  createdAt: string;
}

export function ForumThreadCard({ id, title, authorName, commentCount, createdAt }: ForumThreadCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <Link href={`/forum/thread/${id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {sanitizeInput(title)}
          </h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span className="text-xs">{sanitizeInput(authorName)}</span>
              </div>
              <span className="text-xs">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{commentCount}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
