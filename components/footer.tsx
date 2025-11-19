import { ChefHat } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold">
              <ChefHat className="h-5 w-5 text-primary" />
              <span>ChefShare</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A secure platform for sharing recipes and culinary knowledge.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/recipes" className="hover:text-primary transition-colors">Recipes</a></li>
              <li><a href="/forum" className="hover:text-primary transition-colors">Forum</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Security</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span>Input Validation</span></li>
              <li><span>XSS Protection</span></li>
              <li><span>Role-Based Access</span></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">About</h3>
            <p className="text-sm text-muted-foreground">
              Built for educational purposes to demonstrate web security best practices.
            </p>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© 2025 ChefShare. A Cybersecurity Course Project.</p>
        </div>
      </div>
    </footer>
  );
}
