"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUserGoals, createGoal, updateGoal, deleteGoal } from "@/api/goals";
import { toast } from "react-hot-toast";
import { Goal } from "@/types";
import { GoalForm } from "@/components/GoalForm";
import { GoalList } from "@/components/GoalList";

const GoalsPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGoalsData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchUserGoals(session?.user?.id as string);
      setGoals(data);
    } catch (error) {
      toast.error("Failed to fetch goals. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGoal = async (newGoal: Goal) => {
    setIsLoading(true);
    try {
      await createGoal(session?.user?.id as string, newGoal);
      await fetchGoalsData();
      toast.success("Goal created successfully!");
    } catch (error) {
      toast.error("Failed to create goal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateGoal = async (updatedGoal: Goal) => {
    setIsLoading(true);
    try {
      await updateGoal(updatedGoal);
      await fetchGoalsData();
      toast.success("Goal updated successfully!");
    } catch (error) {
      toast.error("Failed to update goal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    setIsLoading(true);
    try {
      await deleteGoal(goalId);
      await fetchGoalsData();
      toast.success("Goal deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete goal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchGoalsData();
    }
  }, [session]);

  if (!session) {
    return <div>Please login to view your goals</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Your Goals</h1>
      <GoalForm onCreateGoal={handleCreateGoal} />
      <GoalList
        goals={goals}
        isLoading={isLoading}
        onUpdateGoal={handleUpdateGoal}
        onDeleteGoal={handleDeleteGoal}
      />
    </div>
  );
};

export default GoalsPage;