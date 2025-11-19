import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, User } from 'lucide-react';
import { sanitizeInput } from '@/lib/sanitizer';

interface RecipeCardProps {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  authorName: string;
  likeCount: number;
}

export function RecipeCard({ id, title, category, imageUrl, authorName, likeCount }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={sanitizeInput(title)}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">
              {sanitizeInput(title)}
            </h3>
          </div>
          <Badge variant="secondary" className="text-xs">
            {sanitizeInput(category)}
          </Badge>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span className="text-xs">{sanitizeInput(authorName)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-3 w-3" />
            <span className="text-xs">{likeCount}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
