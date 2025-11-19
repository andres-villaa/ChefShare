'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/input-field';
import { AlertBanner } from '@/components/alert-banner';
import { useAuth } from '@/lib/auth-context';
import { login } from '@/lib/fake-api';
import { validateEmail } from '@/lib/validators';
import { sanitizeInput } from '@/lib/sanitizer';

export default function LoginPage() {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.errors[0]);
      return;
    }
    
    // Check for too many failed attempts (brute force mitigation demo)
    if (failedAttempts >= 3) {
      setError('Too many failed attempts. Please wait before trying again.');
      return;
    }
    
    setLoading(true);
    
    try {
      // Sanitize inputs before sending
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedPassword = sanitizeInput(password);
      
      const response = await login(sanitizedEmail, sanitizedPassword);
      authLogin(response.user, response.token);
      router.push('/recipes');
    } catch (err) {
      setFailedAttempts(prev => prev + 1);
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your ChefShare account
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <AlertBanner
                type="error"
                message={error}
                onClose={() => setError('')}
              />
            )}
            
            {failedAttempts > 0 && failedAttempts < 3 && (
              <AlertBanner
                type="warning"
                message={`Failed login attempts: ${failedAttempts}/3`}
              />
            )}
            
            <InputField
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="chef@example.com"
              required
            />
            
            <InputField
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
              required
            />
            
            <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
              <p className="font-medium mb-1">Demo Accounts:</p>
              <p>Admin: admin@chefshare.com / Admin123!</p>
              <p>User: chef@example.com / Chef123!</p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            
            <p className="text-sm text-muted-foreground text-center">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
