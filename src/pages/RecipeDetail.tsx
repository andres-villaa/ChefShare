import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Clock, Users, ChefHat, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import supabase from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";

const RecipeDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [recipe, setRecipe] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    async function load() {
      // load recipe
      const { data: rdata, error: rerr } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single();
      if (rerr) {
        console.error('Error loading recipe', rerr.message);
      } else if (mounted) {
        setRecipe(rdata);
      }

      // load comments
      const { data: cdata } = await supabase
        .from('comments')
        .select('*')
        .eq('recipe_id', id)
        .order('created_at', { ascending: false });
      if (mounted) setComments(cdata || []);

      // load likes count and user like
      const { count } = await supabase
        .from('likes')
        .select('id', { count: 'exact' })
        .eq('recipe_id', id);
      if (mounted) setLikesCount(count || 0);

      if (user?.id) {
        const { data: userLike } = await supabase
          .from('likes')
          .select('id')
          .eq('recipe_id', id)
          .eq('user_id', user.id)
          .limit(1)
          .single();
        if (mounted) setLiked(!!userLike);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id, user]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: 'Debes iniciar sesión', variant: 'destructive' });
      return;
    }
    if (!comment.trim()) return;
    const { error } = await supabase.from('comments').insert([
      { content: comment.trim(), recipe_id: id, author_id: user.id }
    ]);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return;
    }
    setComment('');
    toast({ title: 'Comentario publicado' });
    // reload comments
    const { data: cdata } = await supabase
      .from('comments')
      .select('*')
      .eq('recipe_id', id)
      .order('created_at', { ascending: false });
    setComments(cdata || []);
  };

  const toggleLike = async () => {
    if (!user) {
      toast({ title: 'Debes iniciar sesión', variant: 'destructive' });
      return;
    }
    if (liked) {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('recipe_id', id)
        .eq('user_id', user.id);
      if (!error) {
        setLiked(false);
        setLikesCount((c) => Math.max(0, c - 1));
      } else {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      }
    } else {
      const { error } = await supabase
        .from('likes')
        .insert([{ recipe_id: id, user_id: user.id }]);
      if (!error) {
        setLiked(true);
        setLikesCount((c) => c + 1);
      } else {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Loader o mensaje si no hay receta */}
        {!recipe ? (
          <div className="text-center py-20 text-muted-foreground text-xl">Receta no encontrada o cargando...</div>
        ) : (
        <>
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
              src={recipe.image_url}
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
                <div className="ml-4 flex items-center gap-2">
                  <Button size="sm" variant="ghost" onClick={toggleLike}>
                    <Heart className={`h-4 w-4 ${liked ? 'text-red-500 fill-red-500' : ''}`} />
                    <span className="ml-2 text-sm text-muted-foreground">{likesCount}</span>
                  </Button>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {recipe.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <ChefHat className="h-5 w-5" />
                <span>Por {recipe.author_name || recipe.author}</span>
              </div>
              <p className="text-foreground text-lg leading-relaxed">
                {recipe.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-6 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Tiempo</p>
                  <p className="font-semibold text-foreground">{recipe.time} minutos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Dificultad</p>
                  <p className="font-semibold text-foreground">{recipe.difficulty}</p>
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
                {(recipe.ingredients || []).map((ingredient: any, index: number) => (
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
                {(recipe.steps || []).map((instruction: any, index: number) => (
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
            {comments.map((c) => (
              <div
                key={c.id}
                className="flex gap-4 p-4 bg-card border border-border rounded-lg"
              >
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {String(c.author_id || '').substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">
                      {c.author_name || c.author_id}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(c.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-foreground">{c.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetail;
