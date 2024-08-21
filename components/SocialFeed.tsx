"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchUser } from "@/api/users";
import {
  fetchPost,
  createPost,
  updatePost,
  deletePost,
} from "@/api/posts";
import { toast } from "react-hot-toast";
import { Post, User } from "@/types";
import { CommentSection } from "@/components/CommentSection";

interface SocialFeedProps {
  userId: string;
}

const SocialFeed = ({ userId }: SocialFeedProps) => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPost(userId);
      setPosts(data);
    } catch (error) {
      toast.error("Failed to fetch posts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPostText(event.target.value);
  };

  const handleSubmitPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newPostText.trim()) {
      toast.error("Please enter a post.");
      return;
    }

    try {
      await createPost({
        content: newPostText,
        userId: session?.user?.id as string,
      });
      setNewPostText("");
      await fetchPosts();
      toast.success("Post created successfully!");
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
    }
  };

  const handleDeletePost = async (postId: string) => {
    setIsLoading(true);
    try {
      await deletePost(postId);
      await fetchPosts();
      toast.success("Post deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePost = async (updatedPost: Post) => {
    setIsLoading(true);
    try {
      await updatePost(updatedPost);
      await fetchPosts();
      toast.success("Post updated successfully!");
    } catch (error) {
      toast.error("Failed to update post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserData = async () => {
    if (session?.user) {
      try {
        const fetchedUser = await fetchUser(session.user.id as string);
        setUser(fetchedUser);
      } catch (error) {
        toast.error("Failed to fetch user data. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchPosts();
  }, [session]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Social Feed</h2>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border rounded-md p-4">
              <div className="flex items-center gap-4">
                <img
                  src={post.user.profilePicture}
                  alt={post.user.username}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-col">
                  <h3 className="font-bold">{post.user.username}</h3>
                  <p>{post.content}</p>
                </div>
              </div>
              {session?.user?.id === post.userId && (
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdatePost(post)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Edit
                  </button>
                </div>
              )}
              <CommentSection postId={post.id} />
            </li>
          ))}
        </ul>
      )}
      {session && (
        <form onSubmit={handleSubmitPost} className="mt-4">
          <textarea
            value={newPostText}
            onChange={handlePostChange}
            placeholder="What's on your mind?"
            className="w-full border rounded-md p-2 resize-none focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:shadow-outline"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default SocialFeed;