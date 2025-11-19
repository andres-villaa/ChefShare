import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChefHat, Shield, Users, BookOpen } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Shield className="h-4 w-4" />
              <span>Built with Security Best Practices</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Share Your Culinary{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Masterpieces
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Join a community of food lovers sharing recipes, techniques, and culinary wisdom. 
              Built with robust security to protect your content and privacy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/recipes">
                <Button size="lg" className="w-full sm:w-auto">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse Recipes
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why ChefShare?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A secure platform designed for food enthusiasts who value both great recipes and data protection.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <ChefHat className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Share Recipes</h3>
              <p className="text-muted-foreground">
                Create and share your favorite recipes with detailed ingredients and step-by-step instructions.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Join Discussions</h3>
              <p className="text-muted-foreground">
                Participate in food forums, ask questions, and learn from experienced home cooks and chefs.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Secure Platform</h3>
              <p className="text-muted-foreground">
                Your data is protected with input validation, XSS prevention, and role-based access control.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Sharing?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Create your account today and join our growing community of food enthusiasts.
            </p>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
