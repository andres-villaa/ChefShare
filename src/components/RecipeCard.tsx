import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ChefHat, Bookmark, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";

interface RecipeCardProps {
  id: string | number;
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
  const { user } = useAuth();
  const [likesCount, setLikesCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    async function fetchLikesAndSaved() {
      try {
        const { data: countData, error: countErr, count } = await supabase
          .from('likes')
          .select('id', { count: 'exact' })
          .eq('recipe_id', id);
        if (countErr) return;
        if (!mounted) return;
        setLikesCount(count || 0);

        if (user?.id) {
          const { data: userLike } = await supabase
            .from('likes')
            .select('id')
            .eq('recipe_id', id)
            .eq('user_id', user.id)
            .limit(1)
            .single();
          setLiked(!!userLike);

          const { data: userSaved } = await supabase
            .from('saved_recipes')
            .select('id')
            .eq('recipe_id', id)
            .eq('user_id', user.id)
            .limit(1)
            .single();
          setSaved(!!userSaved);
        }
      } catch (err) {
        // ignore
      }
    }
    fetchLikesAndSaved();
    return () => { mounted = false; };
  }, [id, user]);

  const toggleLike = async () => {
    if (!user) {
      // could show toast; keep UI simple here
      return;
    }
    try {
      if (liked) {
        // remove like
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('recipe_id', id)
          .eq('user_id', user.id);
        if (!error) {
          setLiked(false);
          setLikesCount((c) => Math.max(0, c - 1));
        }
      } else {
        const { error } = await supabase
          .from('likes')
          .insert([{ recipe_id: id, user_id: user.id }]);
        if (!error) {
          setLiked(true);
          setLikesCount((c) => c + 1);
        }
      }
    } catch (err) {
      // ignore
    }
  };

  const toggleSaved = async () => {
    if (!user) return;
    try {
      if (saved) {
        const { error } = await supabase
          .from('saved_recipes')
          .delete()
          .eq('recipe_id', id)
          .eq('user_id', user.id);
        if (!error) setSaved(false);
      } else {
        const { error } = await supabase
          .from('saved_recipes')
          .insert([{ recipe_id: id, user_id: user.id }]);
        if (!error) setSaved(true);
      }
    } catch (err) {
      // ignore
    }
  };

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
        <Button size="icon" variant="outline" onClick={toggleLike} className="flex-shrink-0">
          <Heart className={`h-4 w-4 ${liked ? 'text-red-500 fill-red-500' : ''}`} />
        </Button>
        <div className="text-sm text-muted-foreground w-12 text-center">{likesCount}</div>
        <Button size="icon" variant="outline" onClick={toggleSaved} className="flex-shrink-0">
          <Bookmark className={`h-4 w-4 ${saved ? 'text-blue-500 fill-blue-500' : ''}`} />
        </Button>
        <Button size="icon" variant="outline" className="flex-shrink-0">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
