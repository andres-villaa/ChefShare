import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const Recipes = () => {
  const [searchAuthor, setSearchAuthor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  const categories = [
    "Desayuno",
    "Almuerzo",
    "Cena",
    "Postres",
    "Vegetariano",
    "Vegano",
  ];

  const recipes = [
    {
      id: 1,
      title: "Paella Valenciana",
      author: "Chef Miguel",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&q=80",
      time: 60,
      difficulty: "Avanzado",
      category: "Almuerzo",
    },
    {
      id: 2,
      title: "Ensalada Fresca de Quinoa",
      author: "Ana Cocina",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
      time: 20,
      difficulty: "Fácil",
      category: "Vegetariano",
    },
    {
      id: 3,
      title: "Curry de Garbanzos y Espinacas",
      author: "Sabores de Sofia",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80",
      time: 45,
      difficulty: "Moderado",
      category: "Vegano",
    },
    {
      id: 4,
      title: "Tarta de Manzana Casera",
      author: "Recetas de Pedro",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&q=80",
      time: 90,
      difficulty: "Moderado",
      category: "Postres",
    },
    {
      id: 5,
      title: "Smoothie Tropical Antioxidante",
      author: "Ana Cocina",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&q=80",
      time: 10,
      difficulty: "Fácil",
      category: "Desayuno",
    },
    {
      id: 6,
      title: "Lasaña Clásica a la Boloñesa",
      author: "Chef Miguel",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
      time: 120,
      difficulty: "Avanzado",
      category: "Cena",
    },
    {
      id: 7,
      title: "Pan Integral Casero",
      author: "Recetas de Pedro",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
      time: 180,
      difficulty: "Moderado",
      category: "Desayuno",
    },
    {
      id: 8,
      title: "Sopa de Verduras de la Abuela",
      author: "Recetas de Pedro",
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
      time: 40,
      difficulty: "Fácil",
      category: "Cena",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Descubre Nuevas Recetas
          </h1>
          <p className="text-muted-foreground">
            Explora nuestra colección de deliciosas recetas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-foreground">
                  Categorías
                </h3>
                <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="cursor-pointer">
                      Todas
                    </Label>
                  </div>
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value={category} id={category} />
                      <Label htmlFor={category} className="cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-foreground">
                  Dificultad
                </h3>
                <RadioGroup value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="all" id="diff-all" />
                    <Label htmlFor="diff-all" className="cursor-pointer">
                      Todas
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="Fácil" id="facil" />
                    <Label htmlFor="facil" className="cursor-pointer">
                      Fácil
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="Moderado" id="moderado" />
                    <Label htmlFor="moderado" className="cursor-pointer">
                      Moderado
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="Avanzado" id="avanzado" />
                    <Label htmlFor="avanzado" className="cursor-pointer">
                      Avanzado
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-foreground">
                  Autor
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar autor..."
                    value={searchAuthor}
                    onChange={(e) => setSearchAuthor(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Recipes Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Recipes;
