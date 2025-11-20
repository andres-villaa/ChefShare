import { Heart, Clock, ChefHat, Star, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  id: number;
  title: string;
  author: string;
  image: string;
  cookTime?: string;
  difficulty?: string;
  likes: number;
  rating: number;
  showActions?: boolean;
}

const RecipeCard = ({ id, title, author, image, cookTime, difficulty, likes, rating, showActions }: RecipeCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link to={`/recipe/${id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {difficulty && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-card/90 text-foreground backdrop-blur-sm">
                {difficulty}
              </Badge>
            </div>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4 space-y-3">
        <Link to={`/recipe/${id}`}>
          <h3 className="font-semibold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ChefHat className="h-4 w-4" />
          <span>Por {author}</span>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {cookTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{cookTime}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium text-foreground">{rating}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Heart className="h-4 w-4" />
          <span className="text-sm">{likes}</span>
        </div>
        {!showActions ? (
          <Link to={`/recipe/${id}`}>
            <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
              Ver Receta
            </Button>
          </Link>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4 mr-1" />
              Editar
            </Button>
            <Button size="sm" variant="destructive">
              <Trash2 className="w-4 h-4 mr-1" />
              Eliminar
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
