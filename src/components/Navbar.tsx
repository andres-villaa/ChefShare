import { ChefHat, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-card/90">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">KitchenLink</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Inicio
            </Link>
            <Link to="/recipes" className="text-foreground hover:text-primary transition-colors font-medium">
              Recetas
            </Link>
            <Link to="/forums" className="text-foreground hover:text-primary transition-colors font-medium">
              Foros
            </Link>
            <Link to="/profile" className="text-foreground hover:text-primary transition-colors font-medium">
              Perfil
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/auth">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <User className="h-4 w-4 mr-2" />
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="hidden sm:flex">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
