import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  Clock,
  Users,
  ChefHat,
  Bookmark,
  Share2,
  MessageCircle,
} from "lucide-react";

const RecipeDetail = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState("");

  const recipe = {
    title: "Paella Valenciana Auténtica",
    author: {
      name: "María García",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      recipes: 24,
    },
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a",
    description:
      "Una auténtica receta de paella valenciana con pollo, conejo y judías verdes. Esta receta tradicional te transportará directamente a Valencia.",
    prepTime: "30 min",
    cookTime: "45 min",
    servings: 6,
    difficulty: "Media",
    rating: 4.8,
    likes: 245,
    category: "Plato Principal",
    ingredients: [
      "400g de arroz bomba",
      "500g de pollo troceado",
      "300g de conejo troceado",
      "200g de judías verdes",
      "100g de garrofón",
      "1 tomate maduro rallado",
      "Azafrán",
      "Aceite de oliva",
      "Sal",
      "1.2L de caldo de pollo",
    ],
    steps: [
      "Calentar aceite en la paellera a fuego medio-alto.",
      "Dorar el pollo y el conejo hasta que estén bien sellados.",
      "Añadir las judías verdes y el garrofón, sofreír durante 5 minutos.",
      "Incorporar el tomate rallado y cocinar hasta que reduzca.",
      "Añadir el arroz y remover para que se impregne bien.",
      "Verter el caldo caliente y el azafrán.",
      "Cocer a fuego fuerte durante 10 minutos y luego a fuego suave otros 8-10 minutos.",
      "Dejar reposar 5 minutos antes de servir.",
    ],
    comments: [
      {
        id: 1,
        author: "Carlos Ruiz",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
        text: "¡Espectacular! La hice para la familia y todos quedaron encantados.",
        date: "Hace 2 días",
      },
      {
        id: 2,
        author: "Ana López",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
        text: "Muy buena receta, aunque yo le pongo un poco más de azafrán.",
        date: "Hace 5 días",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{recipe.category}</Badge>
            <Badge variant="outline">{recipe.difficulty}</Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {recipe.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={recipe.author.avatar} />
                <AvatarFallback>MG</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">
                  {recipe.author.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {recipe.author.recipes} recetas publicadas
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={liked ? "default" : "outline"}
                size="sm"
                onClick={() => setLiked(!liked)}
              >
                <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
                {recipe.likes + (liked ? 1 : 0)}
              </Button>
              <Button
                variant={saved ? "default" : "outline"}
                size="sm"
                onClick={() => setSaved(!saved)}
              >
                <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="rounded-lg overflow-hidden mb-8">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border rounded-lg p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Preparación</p>
            <p className="font-semibold">{recipe.prepTime}</p>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center">
            <ChefHat className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Cocción</p>
            <p className="font-semibold">{recipe.cookTime}</p>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Porciones</p>
            <p className="font-semibold">{recipe.servings}</p>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center">
            <Heart className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Valoración</p>
            <p className="font-semibold">{recipe.rating}★</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-muted-foreground leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Ingredients and Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Ingredients */}
          <div className="md:col-span-1">
            <div className="bg-card border rounded-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Ingredientes
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-foreground">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Steps */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Preparación
            </h2>
            <div className="space-y-6">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-foreground leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Comentarios ({recipe.comments.length})
          </h2>

          {/* Add Comment */}
          <div className="mb-8">
            <Textarea
              placeholder="Comparte tu experiencia con esta receta..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-4"
            />
            <Button>Publicar Comentario</Button>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {recipe.comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">
                      {comment.author}
                    </p>
                    <span className="text-sm text-muted-foreground">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-foreground">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RecipeDetail;
