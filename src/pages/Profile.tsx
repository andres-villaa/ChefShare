import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings, Plus, Heart, BookMarked } from "lucide-react";

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const user = {
    name: "María García",
    email: "maria@email.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    bio: "Apasionada de la cocina mediterránea y la repostería. Me encanta experimentar con nuevos sabores y compartir mis creaciones.",
    stats: {
      recipes: 24,
      followers: 342,
      following: 156,
      likes: 1248,
    },
  };

  const myRecipes = [
    {
      id: 1,
      title: "Paella Valenciana",
      author: "María García",
      image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a",
      rating: 4.8,
      likes: 245,
    },
    {
      id: 2,
      title: "Gazpacho Andaluz",
      author: "María García",
      image: "https://images.unsplash.com/photo-1541529086526-db283c563270",
      rating: 4.7,
      likes: 198,
    },
    {
      id: 3,
      title: "Tarta de Santiago",
      author: "María García",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
      rating: 4.9,
      likes: 312,
    },
  ];

  const savedRecipes = [
    {
      id: 4,
      title: "Pasta Carbonara",
      author: "Giuseppe Romano",
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3",
      rating: 4.7,
      likes: 276,
    },
    {
      id: 5,
      title: "Tacos al Pastor",
      author: "Miguel Hernández",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
      rating: 4.8,
      likes: 421,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <div className="bg-card border rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>MG</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {user.name}
                  </h1>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Editar Perfil
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Perfil</DialogTitle>
                      <DialogDescription>
                        Actualiza tu información personal
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" defaultValue={user.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Biografía</Label>
                        <Textarea id="bio" defaultValue={user.bio} />
                      </div>
                      <Button className="w-full">Guardar Cambios</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <p className="text-foreground mb-4">{user.bio}</p>

              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {user.stats.recipes}
                  </p>
                  <p className="text-sm text-muted-foreground">Recetas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {user.stats.followers}
                  </p>
                  <p className="text-sm text-muted-foreground">Seguidores</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {user.stats.following}
                  </p>
                  <p className="text-sm text-muted-foreground">Siguiendo</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {user.stats.likes}
                  </p>
                  <p className="text-sm text-muted-foreground">Likes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="recipes" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="recipes">Mis Recetas</TabsTrigger>
            <TabsTrigger value="saved">Guardadas</TabsTrigger>
            <TabsTrigger value="create">Crear Receta</TabsTrigger>
          </TabsList>

          <TabsContent value="recipes">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Mis Recetas ({myRecipes.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} showActions />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <BookMarked className="w-6 h-6" />
                Recetas Guardadas ({savedRecipes.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create">
            <div className="bg-card border rounded-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Plus className="w-6 h-6" />
                Crear Nueva Receta
              </h2>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título de la receta</Label>
                  <Input id="title" placeholder="Ej: Paella Valenciana" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe tu receta..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prep-time">Tiempo de preparación</Label>
                    <Input id="prep-time" placeholder="30 min" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="servings">Porciones</Label>
                    <Input id="servings" type="number" placeholder="4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Imagen</Label>
                  <Input id="image" type="file" accept="image/*" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ingredients">Ingredientes</Label>
                  <Textarea
                    id="ingredients"
                    placeholder="Lista los ingredientes (uno por línea)"
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="steps">Pasos de preparación</Label>
                  <Textarea
                    id="steps"
                    placeholder="Describe los pasos (uno por línea)"
                    rows={6}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Publicar Receta
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
