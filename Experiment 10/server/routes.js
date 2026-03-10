

import { storage, setupSession } from "./storage.js";
import { api } from "../shared/routes.js";
import { z } from "zod";

// Mock user creation for initial testing if db is empty
async function seedDatabase() {
  try {
    const existingPosts = await storage.getPosts();
    if (existingPosts && existingPosts.length > 0) return; // DB already has posts

    // Force create mock users if they don't exist
    let user1 = await storage.getUserByUsername("travelr_mike");
    if (!user1) {
      user1 = await storage.createUser({
        username: "travelr_mike",
        email: "mike@example.com",
        password: "password123" 
      });
    }

    let user2 = await storage.getUserByUsername("jessicavibes");
    if (!user2) {
      user2 = await storage.createUser({
        username: "jessicavibes",
        email: "jess@example.com",
        password: "password123"
      });
    }

    let user3 = await storage.getUserByUsername("nature.lover");
    if (!user3) {
      user3 = await storage.createUser({
        username: "nature.lover",
        email: "nature@example.com",
        password: "password123"
      });
    }

    // Seed realistic detailed mock posts
    await storage.createPost(user1._id, {
      image: "https://images.unsplash.com/photo-1506744626753-eda8151a7471?w=800&auto=format&fit=crop",
      caption: "Nothing beats a calm morning by the lake. This view never gets old! 🌲🚣‍♂️ #nature #outdoors #hiking"
    });

    await storage.createPost(user2._id, {
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop",
      caption: "Late night cravings satisfied ☕ Which one are you picking? #coffee #latteart #cafe"
    });

    await storage.createPost(user3._id, {
      image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop",
      caption: "Into the woods we go... 🌲 Finding peace in the simplest things. #exploration #peaceful #forest"
    });

    console.log("Mock database successfully seeded with 3 realistic posts!");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

export async function registerRoutes(
httpServer,
app)
{
  // Setup session for auth
  setupSession(app);

  app.post(api.auth.signup.path, async (req, res) => {
    try {
      const input = api.auth.signup.input.parse(req.body);

      const existingUser = await storage.getUserByUsername(input.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(input.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await storage.createUser(input);

      // Store user id in session
      req.session.userId = user._id;

      res.status(201).json(user);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.')
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.auth.login.path, async (req, res) => {
    try {
      const input = api.auth.login.input.parse(req.body);

      const user = await storage.getUserByEmail(input.email);

      // Basic mock authentication check
      if (!user || user.password !== input.password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      req.session.userId = user._id;
      res.status(200).json(user);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.')
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.auth.logout.path, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  });

  app.get(api.auth.me.path, async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json(user);
  });

  app.get(api.posts.list.path, async (req, res) => {
    const posts = await storage.getPosts();
    res.status(200).json(posts);
  });

  app.post(api.posts.create.path, async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const input = api.posts.create.input.parse(req.body);
      const post = await storage.createPost(userId, input);
      res.status(201).json(post);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.')
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.posts.like.path, async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const postId = req.params.id;
    if (!postId) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await storage.likePost(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  });

  // Call seed database after routes are registered
  seedDatabase().catch(console.error);

  return httpServer;
}