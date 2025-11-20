import { ChefHat, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ChefHat className="h-8 w-8" />
              <span className="text-2xl font-bold">KitchenLink</span>
            </div>
            <p className="text-secondary-foreground/80 text-sm">
              Conectando amantes de la gastronomía desde 2024
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categorías */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Categorías</h3>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li><a href="#" className="hover:text-primary transition-colors">Postres</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Bebidas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Platos Principales</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Entradas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Vegetariano</a></li>
            </ul>
          </div>

          {/* Explorar */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Explorar</h3>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li><a href="#" className="hover:text-primary transition-colors">Recetas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Foros</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Chefs Destacados</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Nuevas Recetas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Más Populares</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Legal</h3>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li><a href="#" className="hover:text-primary transition-colors">Acerca de</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Términos de Uso</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm text-secondary-foreground/80">
          <p>&copy; 2024 KitchenLink. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
