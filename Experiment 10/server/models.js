import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  profileImage: { type: String, required: true },
  image: { type: String, required: true },
  caption: { type: String, required: true },
  likes: { type: Number, default: 0 }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
export const Post = mongoose.model('Post', postSchema);
