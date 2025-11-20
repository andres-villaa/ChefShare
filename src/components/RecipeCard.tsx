import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ChefHat, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecipeCardProps {
  id: number;
  title: string;
  author: string;
  rating: number;
  image: string;
  time?: number;
  difficulty?: string;
  category?: string;
}

const RecipeCard = ({
  id,
  title,
  author,
  rating,
  image,
  time,
  difficulty,
  category,
}: RecipeCardProps) => {
  return (
    <Card className="group overflow-hidden border-border hover:shadow-card-hover transition-all duration-300">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold text-base text-foreground line-clamp-1">
          {title}
        </h3>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>Por {author}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-[#FFA500] text-[#FFA500]" />
          <span className="text-sm font-medium text-foreground">{rating}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center gap-2">
        <Link to={`/recipe/${id}`} className="flex-1">
          <Button className="w-full bg-primary hover:bg-primary/90 text-white">
            Ver Receta
          </Button>
        </Link>
        <Button size="icon" variant="outline" className="flex-shrink-0">
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline" className="flex-shrink-0">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
