'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { getForums } from '@/lib/fake-api';
import { sanitizeInput } from '@/lib/sanitizer';
import { MessageSquare } from 'lucide-react';
import type { Forum } from '@/lib/fake-api';

export default function ForumPage() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadForums() {
      try {
        const data = await getForums();
        setForums(data);
      } catch (error) {
        console.error('[v0] Failed to load forums:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadForums();
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Community Forums</h1>
          <p className="text-muted-foreground">Join discussions about cooking, recipes, and culinary techniques</p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading forums...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {forums.map((forum) => (
              <Link key={forum.id} href={`/forum/${forum.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2">
                          {sanitizeInput(forum.name)}
                        </h2>
                        <p className="text-muted-foreground">
                          {sanitizeInput(forum.description)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
