'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (requireAdmin && !isAdmin) {
      router.push('/');
    }
  }, [isAuthenticated, isAdmin, requireAdmin, router]);
  
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Redirecting to login...</p>
      </div>
    );
  }
  
  if (requireAdmin && !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">Access Denied</p>
          <p className="text-muted-foreground">You do not have permission to access this section (admin only).</p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
}
