'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { InputField } from '@/components/input-field';
import { ForumThreadCard } from '@/components/forum-thread-card';
import { useAuth } from '@/lib/auth-context';
import { getForumById, getThreadsByForum, createThread } from '@/lib/fake-api';
import { sanitizeInput } from '@/lib/sanitizer';
import { validateRequired } from '@/lib/validators';
import { Plus } from 'lucide-react';
import type { Forum, Thread } from '@/lib/fake-api';

export default function ForumDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  
  const [forum, setForum] = useState<Forum | null>(null);
  const [threads, setThreads] = useState<Array<Thread & { authorName: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [threadTitle, setThreadTitle] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    async function loadForum() {
      try {
        const forumId = params.id as string;
        const forumData = await getForumById(forumId);
        
        if (!forumData) {
          router.push('/forum');
          return;
        }
        
        setForum(forumData);
        
        const threadsData = await getThreadsByForum(forumId);
        setThreads(threadsData);
      } catch (error) {
        console.error('[v0] Failed to load forum:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadForum();
  }, [params.id, router]);
  
  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const validation = validateRequired(threadTitle, 'Title');
    if (!validation.isValid) {
      setError(validation.errors[0]);
      return;
    }
    
    if (!user) return;
    
    setSubmitting(true);
    
    try {
      const sanitizedTitle = sanitizeInput(threadTitle);
      
      const newThread = await createThread({
        forumId: params.id as string,
        title: sanitizedTitle,
        authorId: user.id
      });
      
      setThreads(prev => [{
        ...newThread,
        authorName: user.name
      }, ...prev]);
      
      setThreadTitle('');
      setShowCreateDialog(false);
    } catch (error) {
      setError('Failed to create thread. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Loading forum...</p>
      </div>
    );
  }
  
  if (!forum) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Forum not found</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/forum" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to Forums
        </Link>
      </div>
      
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {sanitizeInput(forum.name)}
          </h1>
          <p className="text-muted-foreground">
            {sanitizeInput(forum.description)}
          </p>
        </div>
        
        {isAuthenticated && (
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2 flex-shrink-0">
                <Plus className="h-4 w-4" />
                New Thread
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Thread</DialogTitle>
                <DialogDescription>
                  Start a new discussion in {forum.name}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateThread} className="space-y-4 mt-4">
                <InputField
                  label="Thread Title"
                  id="threadTitle"
                  value={threadTitle}
                  onChange={setThreadTitle}
                  placeholder="What would you like to discuss?"
                  required
                  error={error}
                />
                <div className="flex gap-3">
                  <Button type="submit" disabled={submitting} className="flex-1">
                    {submitting ? 'Creating...' : 'Create Thread'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateDialog(false);
                      setThreadTitle('');
                      setError('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      {!isAuthenticated && (
        <Card className="mb-6 bg-muted/50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
              {' '}to create new threads and participate in discussions
            </p>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-4">
        {threads.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                No threads yet. Be the first to start a discussion!
              </p>
            </CardContent>
          </Card>
        ) : (
          threads.map((thread) => (
            <ForumThreadCard
              key={thread.id}
              id={thread.id}
              title={thread.title}
              authorName={thread.authorName}
              commentCount={thread.commentCount}
              createdAt={thread.createdAt}
            />
          ))
        )}
      </div>
    </div>
  );
}
