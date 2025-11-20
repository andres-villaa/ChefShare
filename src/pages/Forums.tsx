import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MessageCircle, Plus, TrendingUp } from "lucide-react";

const Forums = () => {
  const forumThreads = [
    {
      id: 1,
      title: "¿Cuál es tu técnica favorita para hacer pan casero?",
      author: "Carlos Ruiz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      category: "Panadería",
      replies: 24,
      views: 342,
      lastActivity: "Hace 2 horas",
      isHot: true,
    },
    {
      id: 2,
      title: "Sustitutos veganos para huevos en repostería",
      author: "Ana López",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      category: "Cocina Vegana",
      replies: 18,
      views: 256,
      lastActivity: "Hace 5 horas",
      isHot: false,
    },
    {
      id: 3,
      title: "Mejores especias para curry indio auténtico",
      author: "María García",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      category: "Cocina Internacional",
      replies: 31,
      views: 478,
      lastActivity: "Hace 1 día",
      isHot: true,
    },
    {
      id: 4,
      title: "Consejos para mantener el aguacate fresco más tiempo",
      author: "Laura Martínez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura",
      category: "Tips y Trucos",
      replies: 12,
      views: 189,
      lastActivity: "Hace 2 días",
      isHot: false,
    },
    {
      id: 5,
      title: "¿Cómo lograr el punto perfecto en un steak?",
      author: "Miguel Hernández",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel",
      category: "Carnes",
      replies: 27,
      views: 521,
      lastActivity: "Hace 3 días",
      isHot: true,
    },
  ];

  const categories = [
    { name: "Panadería", count: 124 },
    { name: "Cocina Vegana", count: 98 },
    { name: "Cocina Internacional", count: 156 },
    { name: "Tips y Trucos", count: 203 },
    { name: "Carnes", count: 87 },
    { name: "Postres", count: 142 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Foros de Discusión
          </h1>
          <p className="text-muted-foreground">
            Comparte conocimientos, haz preguntas y conecta con otros apasionados
            de la cocina
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card border rounded-lg p-6 sticky top-8">
              <Button className="w-full mb-6">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Tema
              </Button>

              <h3 className="font-semibold text-foreground mb-4">Categorías</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className="w-full flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors text-left"
                  >
                    <span className="text-foreground">{category.name}</span>
                    <Badge variant="secondary">{category.count}</Badge>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Buscar en los foros..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Threads List */}
            <div className="space-y-4">
              {forumThreads.map((thread) => (
                <div
                  key={thread.id}
                  className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={thread.avatar} />
                      <AvatarFallback>{thread.author[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                              {thread.title}
                            </h3>
                            {thread.isHot && (
                              <TrendingUp className="w-4 h-4 text-primary" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>por {thread.author}</span>
                            <span>•</span>
                            <Badge variant="outline">{thread.category}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground mt-4">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{thread.replies} respuestas</span>
                        </div>
                        <span>{thread.views} vistas</span>
                        <span className="ml-auto">{thread.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              <Button variant="outline" size="sm">Anterior</Button>
              <Button variant="outline" size="sm">1</Button>
              <Button size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Siguiente</Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Forums;
