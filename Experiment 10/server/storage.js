import session from "express-session";
import MongoStore from "connect-mongo";
import { User, Post } from "./models.js";

export function setupSession(app) {
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || "mongodb://localhost:27017/insta-clone"
      }),
      secret: process.env.SESSION_SECRET || "instagram_clone_secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: app.get("env") === "production",
      },
    })
  );
}

export class DatabaseStorage {
  async getUser(id) {
    return await User.findById(id).lean();
  }

  async getUserByUsername(username) {
    return await User.findOne({ username }).lean();
  }

  async getUserByEmail(email) {
    return await User.findOne({ email }).lean();
  }

  async createUser(insertUser) {
    const user = new User(insertUser);
    await user.save();
    return user.toObject();
  }

  async getPosts() {
    return await Post.find().sort({ createdAt: -1 }).lean();
  }

  async createPost(userId, post) {
    const user = await this.getUser(userId);
    if (!user) throw new Error("User not found");
    
    const newPost = new Post({
      userId,
      username: user.username,
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
      image: post.image,
      caption: post.caption,
    });
    
    await newPost.save();
    return newPost.toObject();
  }

  async likePost(postId) {
    const post = await Post.findById(postId);
    if (!post) return undefined;
    
    post.likes += 1;
    await post.save();
    return post.toObject();
  }
}

export const storage = new DatabaseStorage();