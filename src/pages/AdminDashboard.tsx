import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, TrendingUp, AlertTriangle } from "lucide-react";

import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRecipes: 0,
    totalForumTopics: 0,
    totalVisits: 0,
    recentRecipes: [],
    activeUsers: [],
    reportedComments: [],
    contentStats: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!isAdmin) return;
      try {
        const res = await fetch("http://localhost:4000/api/admin/stats");
        const json = await res.json();
        setStats(json);
      } catch (err) {
        // Si falla, deja los valores en 0
      }
      setLoading(false);
    };
    fetchStats();
  }, [isAdmin]);

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Acceso Denegado</h1>
          <p className="text-muted-foreground mb-8">
            Solo los administradores pueden acceder a esta sección
          </p>
          <Link to="/">
            <Button>Volver al Inicio</Button>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-muted-foreground">
            Gestiona el contenido y usuarios de ChefShare
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Usuarios registrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Recetas Publicadas</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : stats.totalRecipes}</div>
              <p className="text-xs text-muted-foreground">Recetas totales</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Recetas Reportadas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : stats.reportedComments?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Recetas que requieren moderación</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Visitas Mensuales</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : stats.totalVisits}</div>
              <p className="text-xs text-muted-foreground">Visitas este mes</p>
            </CardContent>
          </Card>
        </div>

        {/* Puedes seguir con las demás tarjetas usando stats.recentRecipes, stats.activeUsers, etc. */}
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
