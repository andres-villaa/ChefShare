import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import herbsImage from "@/assets/herbs-login.jpg";

const Login = () => {
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    
    if (success) {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de vuelta a KitchenLink",
      });
      navigate("/");
    } else {
      toast({
        title: "Error",
        description: "Email o contraseña incorrectos",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-card rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2">
        {/* Image Side */}
        <div className="hidden md:block relative">
          <img
            src={herbsImage}
            alt="Fresh herbs"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Side */}
        <div className="bg-[#F5EFE7] p-8 md:p-12 flex flex-col justify-center">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Iniciar Sesión
              </h1>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="bg-white"
                />
              </div>

              <Button type="submit" className="w-full">
                Iniciar Sesión
              </Button>

              <div className="text-center space-y-2">
                <a href="#" className="text-sm text-primary hover:underline block">
                  ¿Olvidaste tu contraseña?
                </a>
                <p className="text-sm text-muted-foreground">
                  ¿No tienes una cuenta?{" "}
                  <Link to="/register" className="text-foreground font-medium hover:underline">
                    Regístrate aquí.
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
