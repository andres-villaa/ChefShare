import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/RecipeCard";
import CategoryCard from "@/components/CategoryCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-kitchen.jpg";
import { Pizza, Fish, Leaf, Cake, Apple, Coffee, UtensilsCrossed, Globe } from "lucide-react";

const Home = () => {
  const featuredRecipes = [
    {
      id: 1,
      title: "Lasaña Clásica",
      author: "Chef Ana",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    },
    {
      id: 2,
      title: "Tacos de Pescado",
      author: "Gourmet Max",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80",
    },
    {
      id: 3,
      title: "Sopa de Lentejas",
      author: "Cocina Fácil",
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
    },
    {
      id: 4,
      title: "Curry de Pollo",
      author: "Sabor del Mundo",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80",
    },
    {
      id: 5,
      title: "Ensalada Quinoa",
      author: "Vida Sana",
      rating: 4.0,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    },
    {
      id: 6,
      title: "Pastel de Chocolate",
      author: "Postres Divinos",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    },
  ];

  const categories = [
    { name: "Italiana", icon: Pizza, variant: "primary" as const },
    { name: "Mariscos", icon: Fish, variant: "accent" as const },
    { name: "Vegetariana", icon: Leaf, variant: "primary" as const },
    { name: "Postres", icon: Cake, variant: "accent" as const },
    { name: "Saludable", icon: Apple, variant: "primary" as const },
    { name: "Desayunos", icon: Coffee, variant: "accent" as const },
    { name: "Mexicana", icon: UtensilsCrossed, variant: "primary" as const },
    { name: "Global", icon: Globe, variant: "accent" as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-white max-w-4xl">
            Comparte tu pasión por la cocina
          </h1>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/recipes">
              <Button size="lg" className="text-base px-8">
                Explorar recetas
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-base px-8">
                Publica la tuya
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Recetas Destacadas
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="bg-[#F5EFE7] py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Categorías Populares
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                name={category.name}
                icon={category.icon}
                variant={category.variant}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
