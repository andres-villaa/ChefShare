import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  ChefHat,
  MessageCircle,
  Heart,
  AlertCircle,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";

const Admin = () => {
  const stats = [
    { label: "Usuarios Totales", value: "1,248", icon: Users, color: "text-blue-600" },
    { label: "Recetas Publicadas", value: "3,421", icon: ChefHat, color: "text-secondary" },
    { label: "Comentarios", value: "8,756", icon: MessageCircle, color: "text-green-600" },
    { label: "Likes", value: "24,891", icon: Heart, color: "text-primary" },
  ];

  const users = [
    {
      id: 1,
      name: "María García",
      email: "maria@email.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      recipes: 24,
      status: "active",
      joined: "2024-01-15",
    },
    {
      id: 2,
      name: "Carlos Ruiz",
      email: "carlos@email.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      recipes: 18,
      status: "active",
      joined: "2024-02-20",
    },
    {
      id: 3,
      name: "Ana López",
      email: "ana@email.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      recipes: 12,
      status: "suspended",
      joined: "2024-03-10",
    },
  ];

  const pendingRecipes = [
    {
      id: 1,
      title: "Paella Valenciana",
      author: "María García",
      submitted: "Hace 2 horas",
      status: "pending",
    },
    {
      id: 2,
      title: "Tiramisú Clásico",
      author: "Carlos Ruiz",
      submitted: "Hace 5 horas",
      status: "pending",
    },
  ];

  const reportedContent = [
    {
      id: 1,
      type: "comment",
      content: "Este comentario contiene lenguaje inapropiado...",
      reporter: "Ana López",
      reported: "Hace 1 hora",
      status: "pending",
    },
    {
      id: 2,
      type: "recipe",
      content: "Receta con información errónea",
      reporter: "Carlos Ruiz",
      reported: "Hace 3 horas",
      status: "pending",
    },
  ];

  const auditLogs = [
    {
      id: 1,
      action: "Login exitoso",
      user: "maría@email.com",
      timestamp: "2024-01-15 10:30:00",
      ip: "192.168.1.1",
      status: "success",
    },
    {
      id: 2,
      action: "Intento de login fallido",
      user: "unknown@email.com",
      timestamp: "2024-01-15 10:25:00",
      ip: "192.168.1.2",
      status: "failed",
    },
    {
      id: 3,
      action: "Receta publicada",
      user: "carlos@email.com",
      timestamp: "2024-01-15 09:15:00",
      ip: "192.168.1.3",
      status: "success",
    },
    {
      id: 4,
      action: "Comentario eliminado",
      user: "admin@kitchenlink.com",
      timestamp: "2024-01-15 08:45:00",
      ip: "192.168.1.4",
      status: "success",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Panel de Administración
          </h1>
          <p className="text-muted-foreground">
            Gestiona usuarios, contenido y modera la plataforma
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <AlertCircle className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="recipes">Recetas</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <div className="bg-card border rounded-lg">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-foreground">
                    Gestión de Usuarios
                  </h2>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input placeholder="Buscar usuarios..." className="pl-10" />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Recetas</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Registro</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.recipes}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status === "active" ? "default" : "destructive"}
                        >
                          {user.status === "active" ? "Activo" : "Suspendido"}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Editar
                          </Button>
                          <Button size="sm" variant="destructive">
                            Suspender
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Recipes Tab */}
          <TabsContent value="recipes">
            <div className="bg-card border rounded-lg">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Recetas Pendientes de Revisión
                </h2>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Enviado</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRecipes.map((recipe) => (
                    <TableRow key={recipe.id}>
                      <TableCell className="font-medium">{recipe.title}</TableCell>
                      <TableCell>{recipe.author}</TableCell>
                      <TableCell>{recipe.submitted}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Pendiente</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="default">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Aprobar
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="w-4 h-4 mr-1" />
                            Rechazar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="bg-card border rounded-lg">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Contenido Reportado
                </h2>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Contenido</TableHead>
                    <TableHead>Reportado por</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportedContent.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <Badge variant="outline">
                          {report.type === "comment" ? "Comentario" : "Receta"}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {report.content}
                      </TableCell>
                      <TableCell>{report.reporter}</TableCell>
                      <TableCell>{report.reported}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Revisar
                          </Button>
                          <Button size="sm" variant="destructive">
                            Eliminar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs">
            <div className="bg-card border rounded-lg">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Registro de Auditoría
                </h2>
                <p className="text-muted-foreground">
                  Registro de todas las acciones críticas en la plataforma
                </p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Acción</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Fecha y Hora</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.action}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>
                        <Badge
                          variant={log.status === "success" ? "default" : "destructive"}
                        >
                          {log.status === "success" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {log.status === "success" ? "Exitoso" : "Fallido"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
