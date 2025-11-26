import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, BookMarked, MessageSquare, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";
import RecipeCard from "@/components/RecipeCard";

const Profile = () => {
  const { user } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    let mounted = true;
    async function fetchSaved() {
      const { data, error } = await supabase
        .from('saved_recipes')
        .select('recipe_id')
        .eq('user_id', user.id);
      if (!mounted) return;
      if (error || !data?.length) {
        setSavedRecipes([]);
        return;
      }
      const ids = data.map((r: any) => r.recipe_id);
      if (!ids.length) { setSavedRecipes([]); return; }
      const { data: recipesData } = await supabase
        .from('recipes')
        .select('*')
        .in('id', ids);
      setSavedRecipes(recipesData || []);
    }
    fetchSaved();
    return () => { mounted = false; };
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Acceso Denegado</h1>
          <p className="text-muted-foreground mb-8">Debes iniciar sesión para ver tu perfil</p>
          <Link to="/login">
            <Button>Iniciar Sesión</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                  <p className="text-muted-foreground mb-4">{user.email}</p>
                  <div className="flex gap-4 justify-center md:justify-start">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">12</p>
                      <p className="text-sm text-muted-foreground">Recetas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">48</p>
                      <p className="text-sm text-muted-foreground">Seguidores</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">34</p>
                      <p className="text-sm text-muted-foreground">Siguiendo</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>
                  {user.role === 'admin' && (
                    <Link to="/admin">
                      <Button size="sm">Panel Admin</Button>
                    </Link>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="recipes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recipes">Mis Recetas</TabsTrigger>
              <TabsTrigger value="favorites">Favoritos</TabsTrigger>
              <TabsTrigger value="activity">Actividad</TabsTrigger>
            </TabsList>

            <TabsContent value="recipes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mis Recetas Publicadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    Aún no has publicado ninguna receta
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookMarked className="h-5 w-5" />
                    Recetas Guardadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {savedRecipes.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No tienes recetas guardadas
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {savedRecipes.map((recipe) => (
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
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Comentarios Recientes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-8">
                      No has realizado comentarios todavía
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Recetas que te gustaron
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-8">
                      Aún no has dado "me gusta" a ninguna receta
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
