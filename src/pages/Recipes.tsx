import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  // Sample data
  const recipes = [
    {
      id: 1,
      title: "Paella Valenciana",
      author: "María García",
      image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a",
      rating: 4.8,
      likes: 245,
      category: "Plato Principal",
    },
    {
      id: 2,
      title: "Tiramisú Clásico",
      author: "Carlos Ruiz",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
      rating: 4.9,
      likes: 312,
      category: "Postres",
    },
    {
      id: 3,
      title: "Ensalada César",
      author: "Ana López",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
      rating: 4.6,
      likes: 189,
      category: "Ensaladas",
    },
    {
      id: 4,
      title: "Pasta Carbonara",
      author: "Giuseppe Romano",
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3",
      rating: 4.7,
      likes: 276,
      category: "Plato Principal",
    },
    {
      id: 5,
      title: "Brownie de Chocolate",
      author: "Laura Martínez",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
      rating: 4.9,
      likes: 398,
      category: "Postres",
    },
    {
      id: 6,
      title: "Tacos al Pastor",
      author: "Miguel Hernández",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
      rating: 4.8,
      likes: 421,
      category: "Plato Principal",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Explora Recetas
          </h1>
          <p className="text-muted-foreground">
            Descubre miles de recetas deliciosas de nuestra comunidad
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Buscar recetas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="appetizers">Entradas</SelectItem>
                <SelectItem value="main">Plato Principal</SelectItem>
                <SelectItem value="desserts">Postres</SelectItem>
                <SelectItem value="salads">Ensaladas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Dificultad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="easy">Fácil</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="hard">Difícil</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Más filtros
            </Button>
            <Button variant="ghost" size="sm">
              Limpiar filtros
            </Button>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Mostrando <span className="font-semibold text-foreground">{recipes.length}</span> recetas
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Recipes;
