'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CommentCard } from '@/components/comment-card';
import { InputField } from '@/components/input-field';
import { useAuth } from '@/lib/auth-context';
import { getThreadById, getCommentsByThread, createComment, getForumById } from '@/lib/fake-api';
import { sanitizeInput } from '@/lib/sanitizer';
import { User, Clock, MessageSquare } from 'lucide-react';
import type { Thread } from '@/lib/fake-api';

export default function ThreadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  
  const [thread, setThread] = useState<(Thread & { authorName: string }) | null>(null);
  const [forumName, setForumName] = useState('');
  const [comments, setComments] = useState<Array<{ id: string; userName: string; createdAt: string; content: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    async function loadThread() {
      try {
        const threadId = params.id as string;
        const threadData = await getThreadById(threadId);
        
        if (!threadData) {
          router.push('/forum');
          return;
        }
        
        setThread(threadData);
        
        const forum = await getForumById(threadData.forumId);
        if (forum) {
          setForumName(forum.name);
        }
        
        const commentsData = await getCommentsByThread(threadId);
        setComments(commentsData);
      } catch (error) {
        console.error('[v0] Failed to load thread:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadThread();
  }, [params.id, router]);
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim() || !user || !thread) return;
    
    setSubmitting(true);
    
    try {
      const sanitizedContent = sanitizeInput(commentText);
      
      const newComment = await createComment({
        recipeId: null,
        threadId: params.id as string,
        userId: user.id,
        content: sanitizedContent
      });
      
      setComments(prev => [...prev, {
        id: newComment.id,
        userName: user.name,
        createdAt: newComment.createdAt,
        content: newComment.content
      }]);
      
      setThread(prev => prev ? { ...prev, commentCount: prev.commentCount + 1 } : null);
      setCommentText('');
    } catch (error) {
      console.error('[v0] Failed to submit comment:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Loading thread...</p>
      </div>
    );
  }
  
  if (!thread) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Thread not found</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 space-y-2">
        <Link href="/forum" className="text-sm text-muted-foreground hover:text-primary">
          ← Forums
        </Link>
        {forumName && (
          <span className="text-sm text-muted-foreground">
            {' '}/{' '}
            <Link href={`/forum/${thread.forumId}`} className="hover:text-primary">
              {sanitizeInput(forumName)}
            </Link>
          </span>
        )}
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            {sanitizeInput(thread.title)}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{sanitizeInput(thread.authorName)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{thread.commentCount} {thread.commentCount === 1 ? 'reply' : 'replies'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">Replies ({comments.length})</h2>
        
        {isAuthenticated && (
          <form onSubmit={handleSubmitComment} className="mb-6">
            <InputField
              label="Add a reply"
              id="comment"
              value={commentText}
              onChange={setCommentText}
              placeholder="Share your thoughts..."
              multiline
              rows={3}
            />
            <Button type="submit" className="mt-3" disabled={submitting || !commentText.trim()}>
              {submitting ? 'Posting...' : 'Post Reply'}
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
                {' '}to reply to this thread
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
              No replies yet. Be the first to reply!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
