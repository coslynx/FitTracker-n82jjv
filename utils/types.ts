import { Session } from "next-auth/react";
import { Goal } from "./models/Goal";
import { User } from "./models/User";
import { FitnessData } from "./models/FitnessData";
import { Post } from "./models/Post";
import { Comment } from "./models/Comment";

export interface UserWithId extends User {
  id: string;
}

export interface SessionWithUser extends Session {
  user: UserWithId;
}

export type GoalWithId = Goal & { id: string };

export type FitnessDataWithId = FitnessData & { id: string };

export type PostWithId = Post & { id: string };

export type CommentWithId = Comment & { id: string };

export interface ErrorResponse {
  message: string;
}