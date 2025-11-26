import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import supabase from "@/lib/supabaseClient";

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

  const [recipes, setRecipes] = useState<any[]>([]);
  useEffect(() => {
    let mounted = true;
    async function fetchRecipes() {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false });
      if (!mounted) return;
      if (error) {
        setRecipes([]);
      } else {
        setRecipes(data || []);
      }
    }
    fetchRecipes();
    return () => { mounted = false; };
  }, []);

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
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  author={recipe.author_name || recipe.author}
                  rating={recipe.rating}
                  image={recipe.image_url}
                  time={recipe.time}
                  difficulty={recipe.difficulty}
                  category={recipe.category}
                />
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
