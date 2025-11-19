/**
 * Fake API layer for ChefShare
 * 
 * This simulates a real API by working with JSON data files
 * In production, these functions would be replaced with actual API calls
 * to a backend server with proper authentication, authorization, and data persistence
 * 
 * IMPORTANT SECURITY NOTES:
 * - Passwords are stored in plain text in JSON (NEVER do this in production!)
 * - In production, use bcrypt or similar to hash passwords on the backend
 * - Tokens here are fake - use JWT or similar in production
 * - All operations are client-side only - no real data persistence
 */

import usersData from '@/data/users.json';
import recipesData from '@/data/recipes.json';
import commentsData from '@/data/comments.json';
import forumsData from '@/data/forums.json';
import threadsData from '@/data/threads.json';

// In-memory storage (simulates database)
let users = [...usersData];
let recipes = [...recipesData];
let comments = [...commentsData];
let forums = [...forumsData];
let threads = [...threadsData];

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface Recipe {
  id: string;
  title: string;
  category: string;
  authorId: string;
  imageUrl: string;
  ingredients: string[];
  steps: string;
  likeCount: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  recipeId: string | null;
  threadId: string | null;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Forum {
  id: string;
  name: string;
  description: string;
}

export interface Thread {
  id: string;
  forumId: string;
  title: string;
  authorId: string;
  createdAt: string;
  commentCount: number;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}

// Simulated delay for realistic API feel
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * LOGIN
 * Authenticates user with email and password
 * 
 * SECURITY NOTE: In production, this would:
 * - Hash the password before comparing
 * - Use secure session management
 * - Implement rate limiting to prevent brute force
 * - Log authentication attempts
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  await delay(500); // Simulate network request
  
  const user = users.find(u => u.email === email);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // SECURITY WARNING: Plain text password comparison
  // In production, use bcrypt.compare(password, user.hashedPassword)
  if (user.password !== password) {
    throw new Error('Invalid email or password');
  }
  
  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;
  
  // Generate fake token (in production, use JWT)
  const fakeToken = `fake-jwt-token-${user.id}-${Date.now()}`;
  
  return {
    user: userWithoutPassword,
    token: fakeToken
  };
}

/**
 * REGISTER
 * Creates a new user account
 * 
 * SECURITY NOTE: In production, this would:
 * - Hash the password with bcrypt
 * - Validate email uniqueness on backend
 * - Send email verification
 * - Implement CAPTCHA to prevent bot registration
 */
export async function register(userData: { email: string; password: string; name: string }): Promise<AuthResponse> {
  await delay(500);
  
  // Check if email already exists
  if (users.find(u => u.email === userData.email)) {
    throw new Error('Email already registered');
  }
  
  // Create new user
  const newUser: User = {
    id: `user-${Date.now()}`,
    email: userData.email,
    password: userData.password, // SECURITY WARNING: Should be hashed in production!
    name: userData.name,
    role: 'user',
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  const { password: _, ...userWithoutPassword } = newUser;
  const fakeToken = `fake-jwt-token-${newUser.id}-${Date.now()}`;
  
  return {
    user: userWithoutPassword,
    token: fakeToken
  };
}

/**
 * GET ALL RECIPES
 */
export async function getRecipes(): Promise<Recipe[]> {
  await delay(300);
  return [...recipes];
}

/**
 * GET RECIPE BY ID
 */
export async function getRecipeById(id: string): Promise<Recipe | null> {
  await delay(300);
  return recipes.find(r => r.id === id) || null;
}

/**
 * CREATE RECIPE
 */
export async function createRecipe(data: Omit<Recipe, 'id' | 'authorId' | 'likeCount' | 'createdAt'>, authorId: string): Promise<Recipe> {
  await delay(500);
  
  const newRecipe: Recipe = {
    ...data,
    id: `recipe-${Date.now()}`,
    authorId,
    likeCount: 0,
    createdAt: new Date().toISOString()
  };
  
  recipes.push(newRecipe);
  return newRecipe;
}

/**
 * UPDATE RECIPE
 */
export async function updateRecipe(id: string, data: Partial<Recipe>, userId: string): Promise<Recipe> {
  await delay(500);
  
  const index = recipes.findIndex(r => r.id === id);
  if (index === -1) {
    throw new Error('Recipe not found');
  }
  
  // Check ownership (in production, also check on backend)
  if (recipes[index].authorId !== userId) {
    throw new Error('You do not have permission to edit this recipe');
  }
  
  recipes[index] = { ...recipes[index], ...data };
  return recipes[index];
}

/**
 * GET COMMENTS FOR RECIPE
 */
export async function getCommentsByRecipe(recipeId: string): Promise<Array<Comment & { userName: string }>> {
  await delay(300);
  
  const recipeComments = comments.filter(c => c.recipeId === recipeId);
  
  // Join with user data
  return recipeComments.map(comment => {
    const user = users.find(u => u.id === comment.userId);
    return {
      ...comment,
      userName: user?.name || 'Unknown User'
    };
  });
}

/**
 * CREATE COMMENT
 */
export async function createComment(data: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
  await delay(500);
  
  const newComment: Comment = {
    ...data,
    id: `comment-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  
  comments.push(newComment);
  
  // Update thread comment count if applicable
  if (data.threadId) {
    const threadIndex = threads.findIndex(t => t.id === data.threadId);
    if (threadIndex !== -1) {
      threads[threadIndex].commentCount += 1;
    }
  }
  
  return newComment;
}

/**
 * GET ALL FORUMS
 */
export async function getForums(): Promise<Forum[]> {
  await delay(300);
  return [...forums];
}

/**
 * GET FORUM BY ID
 */
export async function getForumById(id: string): Promise<Forum | null> {
  await delay(300);
  return forums.find(f => f.id === id) || null;
}

/**
 * GET THREADS BY FORUM
 */
export async function getThreadsByForum(forumId: string): Promise<Array<Thread & { authorName: string }>> {
  await delay(300);
  
  const forumThreads = threads.filter(t => t.forumId === forumId);
  
  return forumThreads.map(thread => {
    const user = users.find(u => u.id === thread.authorId);
    return {
      ...thread,
      authorName: user?.name || 'Unknown User'
    };
  });
}

/**
 * CREATE THREAD
 */
export async function createThread(data: Omit<Thread, 'id' | 'createdAt' | 'commentCount'>): Promise<Thread> {
  await delay(500);
  
  const newThread: Thread = {
    ...data,
    id: `thread-${Date.now()}`,
    createdAt: new Date().toISOString(),
    commentCount: 0
  };
  
  threads.push(newThread);
  return newThread;
}

/**
 * GET THREAD BY ID
 */
export async function getThreadById(id: string): Promise<(Thread & { authorName: string }) | null> {
  await delay(300);
  
  const thread = threads.find(t => t.id === id);
  if (!thread) return null;
  
  const user = users.find(u => u.id === thread.authorId);
  return {
    ...thread,
    authorName: user?.name || 'Unknown User'
  };
}

/**
 * GET COMMENTS FOR THREAD
 */
export async function getCommentsByThread(threadId: string): Promise<Array<Comment & { userName: string }>> {
  await delay(300);
  
  const threadComments = comments.filter(c => c.threadId === threadId);
  
  return threadComments.map(comment => {
    const user = users.find(u => u.id === comment.userId);
    return {
      ...comment,
      userName: user?.name || 'Unknown User'
    };
  });
}

/**
 * GET USER BY ID
 */
export async function getUserById(id: string): Promise<Omit<User, 'password'> | null> {
  await delay(300);
  
  const user = users.find(u => u.id === id);
  if (!user) return null;
  
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * GET ALL USERS (Admin only)
 */
export async function getAllUsers(): Promise<Array<Omit<User, 'password'>>> {
  await delay(300);
  
  return users.map(({ password: _, ...user }) => user);
}
