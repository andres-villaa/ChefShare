import express from 'express';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan variables de entorno SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
}
const supabase = createClient(supabaseUrl, supabaseKey);

// Endpoint seguro para admins
app.get('/api/admin/users', async (req, res) => {
  // Aquí deberías validar que el usuario que hace la petición es admin
  // Por ejemplo, usando un JWT enviado en headers y verificando el rol
  // Este ejemplo asume que la validación ya se hizo

  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  // Solo enviamos los datos necesarios
  const users = (data.users || []).map(u => ({
    id: u.id,
    email: u.email,
    username: u.user_metadata?.username || '',
    role: u.user_metadata?.role || 'user',
  }));
  res.json({ users });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Admin API corriendo en puerto ${PORT}`);
});
