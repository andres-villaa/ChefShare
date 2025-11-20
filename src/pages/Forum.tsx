import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Forum = () => {
  const { toast } = useToast();
  const [comment, setComment] = useState("");

  const topics = [
    {
      id: 1,
      title: "Recetas rápidas y saludables para la cena entre semana",
      author: "Chef Ana",
      time: "Hace 2 horas",
      replies: 15,
    },
    {
      id: 2,
      title: "Consejos para hornear pan casero perfecto",
      author: "Panadero Pro",
      time: "Ayer",
      replies: 28,
    },
    {
      id: 3,
      title: "Los mejores trucos para cocinar con hierbas frescas",
      author: "Jardinera Gourmet",
      time: "Ayer",
      replies: 8,
    },
    {
      id: 4,
      title: "Ideas innovadoras para postres sin azúcar",
      author: "Dulce Salud",
      time: "Hace 3 días",
      replies: 20,
    },
    {
      id: 5,
      title: "Guía completa para maridar vinos con diferentes platos",
      author: "Sommelier Digital",
      time: "Hace 1 semana",
      replies: 12,
    },
  ];

  const selectedTopic = {
    title: "¿Cómo evitar que mi arroz se pegue?",
    author: "Cocinero Novato",
    time: "Hace 1 día",
    content:
      "Siempre tengo problemas para que mi arroz quede suelto y no se pegue al fondo de la olla de cocción. ¿Alguien tiene algún truco o consejo infalible? He probado de todo y nada parece funcionar! Siempre acabo con un arroz demasiado pastoso o quemado por el fondo. ¡Ayuda, por favor!",
    comments: [
      {
        id: 1,
        author: "Chef Ana",
        time: "Hace 20 horas",
        text: "¡Hola! Un buen truco es enjuagar el arroz varias veces antes de cocinarlo hasta que el agua salga clara. También asegúrate de usar la proporción correcta de agua (generalmente 1.5 a 2 tazas de agua por 1 de arroz) y no destapar la olla durante la cocción. ¡La paciencia es clave!",
      },
      {
        id: 2,
        author: "Cocinero Novato",
        time: "Hace 15 horas",
        text: "¡Muchas gracias! Lo intentaré esta noche. Una pregunta más: ¿es mejor usar olla normal o arrocera?",
      },
    ],
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      toast({
        title: "Comentario publicado",
        description: "Tu respuesta ha sido añadida a la discusión",
      });
      setComment("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Únete a la Conversación Culinaria
          </h1>
          <p className="text-muted-foreground mb-6">
            Comparte experiencias con una comunidad apasionada por la cocina
          </p>
          <Button size="lg">
            Crear Nuevo Tema
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Topics List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Discusiones Recientes
            </h2>
            
            <div className="space-y-3">
              {topics.map((topic) => (
                <Card
                  key={topic.id}
                  className="cursor-pointer hover:shadow-card-hover transition-all duration-300 border-border"
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {topic.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-secondary">
                            {topic.author.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{topic.author}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {topic.replies}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {topic.time}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              Cargar Más Temas
            </Button>
          </div>

          {/* Topic Detail */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    {selectedTopic.title}
                  </h2>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {selectedTopic.author.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">
                        {selectedTopic.author}
                      </p>
                      <p className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {selectedTopic.time}
                      </p>
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    {selectedTopic.content}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      Comentarios ({selectedTopic.comments.length})
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {selectedTopic.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex gap-4 p-4 bg-secondary/20 rounded-lg"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-accent text-accent-foreground">
                            {comment.author.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground">
                              {comment.author}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              • {comment.time}
                            </span>
                          </div>
                          <p className="text-foreground leading-relaxed">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmitComment} className="mt-6">
                    <Textarea
                      placeholder="Escribe tu comentario aquí..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mb-4"
                      rows={4}
                    />
                    <Button type="submit">
                      Publicar Comentario
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Forum;
