"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchUser } from "@/api/users";
import { fetchComment, createComment, deleteComment } from "@/api/comments";
import { toast } from "react-hot-toast";
import { Comment, User } from "@/types";

interface CommentSectionProps {
  postId: string;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const data = await fetchComment(postId);
      setComments(data);
    } catch (error) {
      toast.error("Failed to fetch comments. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentText(event.target.value);
  };

  const handleSubmitComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newCommentText.trim()) {
      toast.error("Please enter a comment.");
      return;
    }

    try {
      await createComment(postId, {
        content: newCommentText,
        userId: session?.user?.id as string,
      });
      setNewCommentText("");
      await fetchComments();
      toast.success("Comment posted successfully!");
    } catch (error) {
      toast.error("Failed to post comment. Please try again.");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    setIsLoading(true);
    try {
      await deleteComment(commentId);
      await fetchComments();
      toast.success("Comment deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete comment. Please try again.");
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
    fetchComments();
  }, [session]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Comments</h2>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="flex gap-4">
              <div className="flex-shrink-0">
                <img
                  src={comment.user.profilePicture}
                  alt={comment.user.username}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <p className="font-bold">{comment.user.username}</p>
                <p>{comment.content}</p>
                {session?.user?.id === comment.userId && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      {session && (
        <form onSubmit={handleSubmitComment} className="mt-4">
          <textarea
            value={newCommentText}
            onChange={handleCommentChange}
            placeholder="Write a comment..."
            className="w-full border rounded-md p-2 resize-none focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:shadow-outline"
          >
            Post Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;