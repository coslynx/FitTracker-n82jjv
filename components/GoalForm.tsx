"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Goal } from "@/types";
import { useStore } from "@/hooks/useGoals";
import { createGoal } from "@/api/goals";

interface GoalFormProps {
  onCreateGoal: (goal: Goal) => void;
}

export const GoalForm = ({ onCreateGoal }: GoalFormProps) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { goals, setGoals } = useStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const newGoal: Goal = {
        title,
        description,
        userId: session?.user?.id as string,
      };
      await createGoal(session?.user?.id as string, newGoal);
      onCreateGoal(newGoal);
      setTitle("");
      setDescription("");
      toast.success("Goal created successfully!");
    } catch (error) {
      toast.error("Failed to create goal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Goal"}
      </button>
    </form>
  );
};