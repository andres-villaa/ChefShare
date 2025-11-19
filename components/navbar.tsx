'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { ChefHat, BookOpen, MessageSquare, User, Shield } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, isAdmin, user } = useAuth();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ChefShare
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/recipes"
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive('/recipes') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Recipes
            </Link>
            
            <Link
              href="/forum"
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive('/forum') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              Forum
            </Link>
            
            {isAdmin && (
              <Link
                href="/admin"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/admin') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user?.name}</span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
