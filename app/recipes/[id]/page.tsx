'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CommentCard } from '@/components/comment-card';
import { InputField } from '@/components/input-field';
import { useAuth } from '@/lib/auth-context';
import { getRecipeById, getUserById, getCommentsByRecipe, createComment } from '@/lib/fake-api';
import { sanitizeInput, sanitizeMultiline } from '@/lib/sanitizer';
import { Heart, User, Clock, Edit } from 'lucide-react';
import type { Recipe } from '@/lib/fake-api';

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  
  const [recipe, setRecipe] = useState<Recipe & { authorName: string } | null>(null);
  const [comments, setComments] = useState<Array<{ id: string; userName: string; createdAt: string; content: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  
  useEffect(() => {
    async function loadRecipe() {
      try {
        const recipeId = params.id as string;
        const data = await getRecipeById(recipeId);
        
        if (!data) {
          router.push('/recipes');
          return;
        }
        
        const author = await getUserById(data.authorId);
        setRecipe({
          ...data,
          authorName: author?.name || 'Unknown'
        });
        
        const commentsData = await getCommentsByRecipe(recipeId);
        setComments(commentsData);
      } catch (error) {
        console.error('[v0] Failed to load recipe:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadRecipe();
  }, [params.id, router]);
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim() || !user) return;
    
    setSubmittingComment(true);
    
    try {
      const sanitizedContent = sanitizeInput(commentText);
      
      const newComment = await createComment({
        recipeId: params.id as string,
        threadId: null,
        userId: user.id,
        content: sanitizedContent
      });
      
      setComments(prev => [...prev, {
        id: newComment.id,
        userName: user.name,
        createdAt: newComment.createdAt,
        content: newComment.content
      }]);
      
      setCommentText('');
    } catch (error) {
      console.error('[v0] Failed to submit comment:', error);
    } finally {
      setSubmittingComment(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Loading recipe...</p>
      </div>
    );
  }
  
  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Recipe not found</p>
      </div>
    );
  }
  
  const isAuthor = user?.id === recipe.authorId;
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/recipes" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to Recipes
        </Link>
      </div>
      
      <div className="aspect-video relative rounded-xl overflow-hidden mb-8">
        <Image
          src={recipe.imageUrl || "/placeholder.svg"}
          alt={sanitizeInput(recipe.title)}
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {sanitizeInput(recipe.title)}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{sanitizeInput(recipe.authorName)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{new Date(recipe.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{recipe.likeCount} likes</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Badge variant="secondary">{sanitizeInput(recipe.category)}</Badge>
            {isAuthor && (
              <Link href={`/recipes/${recipe.id}/edit`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{sanitizeInput(ingredient)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {sanitizeMultiline(recipe.steps)}
            </p>
          </CardContent>
        </Card>
        
        <div className="border-t border-border pt-8">
          <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
          
          {isAuthenticated && (
            <form onSubmit={handleSubmitComment} className="mb-6">
              <InputField
                label="Add a comment"
                id="comment"
                value={commentText}
                onChange={setCommentText}
                placeholder="Share your thoughts..."
                multiline
                rows={3}
              />
              <Button type="submit" className="mt-3" disabled={submittingComment || !commentText.trim()}>
                {submittingComment ? 'Posting...' : 'Post Comment'}
              </Button>
            </form>
          )}
          
          {!isAuthenticated && (
            <Card className="mb-6 bg-muted/50">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                  {' '}to leave a comment
                </p>
              </CardContent>
            </Card>
          )}
          
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                userName={comment.userName}
                date={comment.createdAt}
                content={comment.content}
              />
            ))}
            
            {comments.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
