import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/RecipeCard";
import CategoryCard from "@/components/CategoryCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-kitchen.jpg";
import { Pizza, Fish, Leaf, Cake, Apple, Coffee, UtensilsCrossed, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    async function fetchRecipes() {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);
      if (!mounted) return;
      if (error) {
        setFeaturedRecipes([]);
      } else {
        setFeaturedRecipes(data || []);
      }
    }
    fetchRecipes();
    return () => { mounted = false; };
  }, []);

  const categories = [
    { name: "Desayuno", icon: Coffee, variant: "primary" as const },
    { name: "Almuerzo", icon: UtensilsCrossed, variant: "accent" as const },
    { name: "Cena", icon: UtensilsCrossed, variant: "primary" as const },
    { name: "Postres", icon: Cake, variant: "accent" as const },
    { name: "Vegetariano", icon: Leaf, variant: "primary" as const },
    { name: "Vegano", icon: Apple, variant: "accent" as const },
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
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              author={recipe.author_name || recipe.author}
              rating={recipe.rating}
              image={recipe.image_url}
            />
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
              <Link to={`/recipes?category=${encodeURIComponent(category.name)}`} key={index}>
                <CategoryCard
                  name={category.name}
                  icon={category.icon}
                  variant={category.variant}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
