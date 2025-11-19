'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/input-field';
import { AlertBanner } from '@/components/alert-banner';
import { useAuth } from '@/lib/auth-context';
import { register } from '@/lib/fake-api';
import { validateEmail, validatePassword, validatePasswordMatch, validateRequired } from '@/lib/validators';
import { sanitizeInput } from '@/lib/sanitizer';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');
    
    // Validate all fields
    const nameValidation = validateRequired(name, 'Name');
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const passwordMatchValidation = validatePasswordMatch(password, confirmPassword);
    
    const newErrors: { [key: string]: string } = {};
    
    if (!nameValidation.isValid) newErrors.name = nameValidation.errors[0];
    if (!emailValidation.isValid) newErrors.email = emailValidation.errors[0];
    if (!passwordValidation.isValid) newErrors.password = passwordValidation.errors[0];
    if (!passwordMatchValidation.isValid) newErrors.confirmPassword = passwordMatchValidation.errors[0];
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      // Sanitize inputs before sending
      const sanitizedName = sanitizeInput(name);
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedPassword = sanitizeInput(password);
      
      const response = await register({
        name: sanitizedName,
        email: sanitizedEmail,
        password: sanitizedPassword
      });
      
      login(response.user, response.token);
      setSuccess('Account created successfully! Redirecting...');
      
      setTimeout(() => {
        router.push('/recipes');
      }, 1500);
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Join ChefShare and start sharing your recipes
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {errors.general && (
              <AlertBanner
                type="error"
                message={errors.general}
                onClose={() => setErrors({})}
              />
            )}
            
            {success && (
              <AlertBanner type="success" message={success} />
            )}
            
            <InputField
              label="Name"
              id="name"
              value={name}
              onChange={setName}
              placeholder="Your name"
              required
              error={errors.name}
            />
            
            <InputField
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="chef@example.com"
              required
              error={errors.email}
            />
            
            <InputField
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Create a strong password"
              required
              error={errors.password}
            />
            
            <InputField
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm your password"
              required
              error={errors.confirmPassword}
            />
            
            <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md space-y-1">
              <p className="font-medium">Password Requirements:</p>
              <ul className="list-disc list-inside space-y-0.5 ml-2">
                <li>At least 8 characters long</li>
                <li>One uppercase and one lowercase letter</li>
                <li>One number and one special character</li>
              </ul>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
            
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
