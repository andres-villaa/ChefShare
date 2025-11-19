# Chef Share Frontend

Instrucciones rápidas para instalar y ejecutar este proyecto.

## Requisitos

- Node.js (recomendado: 18 o 20). Comprueba con:

```bash
node -v
```

- pnpm (recomendado porque en el repo hay `pnpm-lock.yaml`). Puedes instalarlo de dos formas:

Opción A — usar Corepack (recomendado si tu Node lo soporta):

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

Opción B — instalar con npm globalmente:

```bash
npm install -g pnpm
```

## Instalación

1. Abre una terminal y sitúate en la raíz del proyecto:

```bash
cd /Users/andresvilla/Downloads/chef-share-frontend
```

2. Instala las dependencias con pnpm:

```bash
pnpm install
```

## Ejecutar en modo desarrollo

Inicia el servidor de desarrollo de Next.js:

```bash
pnpm dev
```

Por defecto la app estará disponible en http://localhost:3000.

Si quieres usar otro puerto:

```bash
pnpm dev -- -p 3001
```

## Construir y servir en producción

```bash
pnpm build
pnpm start
```

## Problemas comunes y soluciones

- Puerto ocupado: elige otro con `pnpm dev -- -p 3001`.
- Versión de Node incompatible: si ves errores extraños, instala Node 18/20 (recomendado) usando `nvm` o tu gestor preferido.
- `pnpm` no encontrado: asegúrate de haber instalado pnpm con `corepack prepare pnpm@latest --activate` o `npm install -g pnpm`.
- Errores de dependencias o tipos: ejecuta `pnpm install` otra vez y revisa la salida; puede indicar dependencias faltantes o conflictos.