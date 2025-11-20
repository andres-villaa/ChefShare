export interface Recipe {
  id: string;
  title: string;
  author: string;
  authorId: string;
  rating: number;
  image: string;
  time?: string;
  difficulty?: string;
  category: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  likes: string[]; // Array of user IDs who liked
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  createdAt: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  author: string;
  authorId: string;
  avatar: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  content: string;
  comments: Comment[];
}

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Pasta Carbonara Clásica',
    author: 'Chef María',
    authorId: '1',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&h=600&fit=crop',
    time: '30 min',
    difficulty: 'Media',
    category: 'Pasta',
    description: 'Una receta tradicional italiana de pasta carbonara con huevo, queso pecorino y guanciale.',
    ingredients: [
      '400g de espagueti',
      '200g de guanciale o panceta',
      '4 huevos',
      '100g de queso pecorino rallado',
      'Pimienta negra al gusto',
      'Sal al gusto'
    ],
    instructions: [
      'Cocina la pasta en agua con sal hasta que esté al dente.',
      'Mientras tanto, corta el guanciale en cubos pequeños y fríelo en una sartén hasta que esté crujiente.',
      'Bate los huevos con el queso pecorino rallado en un bol.',
      'Escurre la pasta y mézclala con el guanciale.',
      'Retira del fuego y añade la mezcla de huevo y queso, mezclando rápidamente.',
      'Sirve inmediatamente con más queso y pimienta negra.'
    ],
    likes: [],
    comments: []
  },
  {
    id: '2',
    title: 'Tacos al Pastor',
    author: 'Chef Carlos',
    authorId: '2',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop',
    time: '45 min',
    difficulty: 'Media',
    category: 'Mexicana',
    description: 'Deliciosos tacos al pastor con piña y cilantro.',
    ingredients: [
      '500g de carne de cerdo',
      '2 chiles guajillo',
      '1 piña',
      'Tortillas de maíz',
      'Cilantro fresco',
      'Cebolla picada',
      'Limones'
    ],
    instructions: [
      'Marina la carne con los chiles guajillo y especias durante 2 horas.',
      'Corta la carne en tiras finas.',
      'Cocina la carne en una sartén o plancha caliente.',
      'Calienta las tortillas.',
      'Sirve con piña asada, cilantro, cebolla y limón.'
    ],
    likes: [],
    comments: []
  },
  {
    id: '3',
    title: 'Ensalada César',
    author: 'Chef Ana',
    authorId: '3',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop',
    time: '15 min',
    difficulty: 'Fácil',
    category: 'Ensaladas',
    description: 'Ensalada fresca con aderezo César casero.',
    ingredients: [
      'Lechuga romana',
      'Crutones',
      'Queso parmesano',
      'Pechuga de pollo',
      'Aderezo César',
      'Anchoas (opcional)'
    ],
    instructions: [
      'Lava y corta la lechuga romana.',
      'Cocina y corta el pollo en tiras.',
      'Mezcla la lechuga con el aderezo.',
      'Añade los crutones, pollo y queso parmesano.',
      'Sirve inmediatamente.'
    ],
    likes: [],
    comments: []
  }
];

export const mockForumTopics: ForumTopic[] = [
  {
    id: '1',
    title: '¿Cuál es tu receta favorita de pasta?',
    author: 'María González',
    authorId: '1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    category: 'Recetas',
    replies: 24,
    views: 156,
    lastActivity: 'Hace 2 horas',
    content: 'Hola a todos! Estoy buscando nuevas ideas para preparar pasta. ¿Cuáles son sus recetas favoritas? Me encantaría conocer tanto recetas tradicionales como creativas.',
    comments: []
  },
  {
    id: '2',
    title: 'Consejos para hacer pan casero',
    author: 'Carlos Ruiz',
    authorId: '2',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    category: 'Técnicas',
    replies: 18,
    views: 203,
    lastActivity: 'Hace 5 horas',
    content: '¿Alguien tiene consejos para lograr un pan casero perfecto? Siempre me queda muy denso.',
    comments: []
  },
  {
    id: '3',
    title: 'Mejores recetas vegetarianas',
    author: 'Ana López',
    authorId: '3',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    category: 'Vegetariano',
    replies: 31,
    views: 284,
    lastActivity: 'Hace 1 día',
    content: 'Comparto algunas de mis recetas vegetarianas favoritas y me gustaría conocer las suyas.',
    comments: []
  }
];
