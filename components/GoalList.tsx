"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Goal } from "@/types";
import { GoalCard } from "@/components/GoalCard";
import { fetchUserGoals } from "@/api/goals";
import { toast } from "react-hot-toast";

interface GoalListProps {
  goals: Goal[];
  isLoading: boolean;
  onUpdateGoal?: (goal: Goal) => void;
  onDeleteGoal?: (goalId: string) => void;
}

export const GoalList = ({
  goals,
  isLoading,
  onUpdateGoal,
  onDeleteGoal,
}: GoalListProps) => {
  const { data: session } = useSession();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p>Loading Goals...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-48">
        <p>Please login to view your goals.</p>
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="flex justify-center items-center h-48">
        <p>You haven't set any goals yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="space-y-4">
        {goals.map((goal) => (
          <li key={goal.id}>
            <GoalCard
              goal={goal}
              onUpdateGoal={onUpdateGoal}
              onDeleteGoal={onDeleteGoal}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};