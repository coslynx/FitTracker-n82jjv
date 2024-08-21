import { getSession } from "next-auth/react";
import { connectToDatabase } from "./db";
import Goal from "@/models/Goal";
import User from "@/models/User";
import FitnessData from "@/models/FitnessData";
import Post from "@/models/Post";
import Comment from "@/models/Comment";

export const fetchUser = async (userId: string) => {
  const { db } = await connectToDatabase();
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user data");
  }
};

export const fetchUserGoals = async (userId: string) => {
  const { db } = await connectToDatabase();
  try {
    const goals = await Goal.find({ userId });
    return goals;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user goals");
  }
};

export const createGoal = async (userId: string, goal: Goal) => {
  const { db } = await connectToDatabase();
  try {
    const newGoal = await Goal.create({ ...goal, userId });
    return newGoal;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create goal");
  }
};

export const updateGoal = async (goal: Goal) => {
  const { db } = await connectToDatabase();
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      goal.id,
      { ...goal },
      { new: true }
    );
    return updatedGoal;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update goal");
  }
};

export const deleteGoal = async (goalId: string) => {
  const { db } = await connectToDatabase();
  try {
    await Goal.findByIdAndDelete(goalId);
    return;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete goal");
  }
};

export const fetchFitnessData = async (userId: string) => {
  const { db } = await connectToDatabase();
  try {
    const fitnessData = await FitnessData.find({ userId });
    return fitnessData;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch fitness data");
  }
};

export const createUser = async (user: User) => {
  const { db } = await connectToDatabase();
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }
};

export const updateUser = async (user: User) => {
  const { db } = await connectToDatabase();
  try {
    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      { ...user },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update user");
  }
};

export const fetchPost = async (userId: string) => {
  const { db } = await connectToDatabase();
  try {
    const posts = await Post.find({ userId })
      .populate("userId")
      .sort({ createdAt: -1 });
    return posts;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts");
  }
};

export const createPost = async (post: Post) => {
  const { db } = await connectToDatabase();
  try {
    const newPost = await Post.create(post);
    return newPost;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create post");
  }
};

export const updatePost = async (post: Post) => {
  const { db } = await connectToDatabase();
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      post.id,
      { ...post },
      { new: true }
    );
    return updatedPost;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update post");
  }
};

export const deletePost = async (postId: string) => {
  const { db } = await connectToDatabase();
  try {
    await Post.findByIdAndDelete(postId);
    return;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete post");
  }
};

export const fetchComment = async (postId: string) => {
  const { db } = await connectToDatabase();
  try {
    const comments = await Comment.find({ postId })
      .populate("userId")
      .sort({ createdAt: -1 });
    return comments;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch comments");
  }
};

export const createComment = async (postId: string, comment: Comment) => {
  const { db } = await connectToDatabase();
  try {
    const newComment = await Comment.create({ ...comment, postId });
    return newComment;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create comment");
  }
};

export const deleteComment = async (commentId: string) => {
  const { db } = await connectToDatabase();
  try {
    await Comment.findByIdAndDelete(commentId);
    return;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete comment");
  }
};

export const getCurrentUser = async () => {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const { db } = await connectToDatabase();
  try {
    const user = await User.findOne({ _id: session.user.id });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};