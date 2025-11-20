import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Clock, Users, ChefHat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RecipeDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [comment, setComment] = useState("");

  const recipe = {
    id: 2,
    title: "Estofado de Lentejas Mediterráneo",
    author: "ChefSabroso",
    rating: 4.8,
    category: "Vegetariano",
    prepTime: 20,
    cookTime: 45,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200&q=80",
    description:
      "Un estofado reconfortante y nutritivo lleno de los vibrantes sabores del Mediterráneo. Perfecto para una comida saludable y fácil.",
    ingredients: [
      "1 cucharada de aceite de oliva",
      "1 cebolla grande, picada",
      "2 dientes de ajo, picados",
      "1 zanahoria, picada",
      "1 tallo de apio, picado",
      "1 lata (400g) de tomates troceados",
      "1 taza de lentejas pardinas, enjuagadas",
      "1 cucharadita de orégano seco",
      "1/2 cucharadita de comino molido",
      "Sal y pimienta al gusto",
      "Espinacas frescas para servir (opcional)",
    ],
    instructions: [
      "Calienta el aceite de oliva en una olla grande a fuego medio. Agrega la cebolla, el ajo, la zanahoria y el apio. Sofríe durante aproximadamente 5-7 minutos.",
      "Agrega los tomates, las lentejas, el orégano y el comino. Remueve bien.",
      "Reduce el fuego y cocina a fuego lento durante 30-35 minutos, o hasta que las lentejas estén tiernas.",
      "Sirve caliente, opcionalmente con un puñado de espinacas frescas.",
    ],
  };

  const comments = [
    {
      id: 1,
      author: "ChefJavier",
      time: "Hace 2 horas",
      text: "¡Increíble receta! Le agregué un poco de limón al final para darle un toque cítrico.",
    },
    {
      id: 2,
      author: "CocinaFeliz",
      time: "Hace 5 horas",
      text: "Perfecto para estos días fríos. ¿Alguien probó con otro tipo de lentejas?",
    },
  ];

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      toast({
        title: "Comentario publicado",
        description: "Tu comentario ha sido añadido exitosamente",
      });
      setComment("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Inicio</Link>
          <span className="mx-2">/</span>
          <Link to="/recipes" className="hover:text-primary">Recetas</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{recipe.title}</span>
        </div>

        {/* Recipe Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-accent text-accent-foreground">
                  {recipe.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-semibold text-lg">{recipe.rating}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {recipe.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <ChefHat className="h-5 w-5" />
                <span>Por {recipe.author}</span>
              </div>
              <p className="text-foreground text-lg leading-relaxed">
                {recipe.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-6 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Preparación</p>
                  <p className="font-semibold text-foreground">{recipe.prepTime} minutos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Cocción</p>
                  <p className="font-semibold text-foreground">{recipe.cookTime} minutos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients & Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Ingredientes
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-foreground"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Instrucciones
              </h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-4"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {index + 1}
                    </span>
                    <p className="text-foreground leading-relaxed pt-1">
                      {instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Comentarios
          </h2>

          <form onSubmit={handleSubmitComment} className="mb-8">
            <Textarea
              placeholder="Escribe tu comentario aquí..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-4"
              rows={4}
            />
            <Button type="submit">Publicar Comentario</Button>
          </form>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">
              Comentarios Recientes
            </h3>
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-4 p-4 bg-card border border-border rounded-lg"
              >
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {comment.author.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">
                      {comment.author}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {comment.time}
                    </span>
                  </div>
                  <p className="text-foreground">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RecipeDetail;
