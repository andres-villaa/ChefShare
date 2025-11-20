import { Button } from "./ui/button";
import { ArrowRight, Utensils } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-sm">
            <Utensils className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Más de 10,000 recetas compartidas</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Comparte tu pasión por la{" "}
            <span className="text-primary">cocina</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre recetas auténticas, conecta con otros amantes de la gastronomía 
            y crea momentos inolvidables en la cocina.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="gap-2 text-base">
              Explorar Recetas
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              Publica la Tuya
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-xl mx-auto">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Recetas</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">5K+</div>
              <div className="text-sm text-muted-foreground">Usuarios</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Me Gusta</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
