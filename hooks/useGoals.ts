"use client";

import { useState, useEffect } from "react";
import create from "zustand";
import { Goal } from "@/types";
import { fetchGoals, createGoal, updateGoal, deleteGoal } from "@/api/goals";
import { toast } from "react-hot-toast";

interface GoalStore {
  goals: Goal[];
  isLoading: boolean;
  fetchGoals: () => Promise<void>;
  createGoal: (newGoal: Goal) => Promise<void>;
  updateGoal: (updatedGoal: Goal) => Promise<void>;
  deleteGoal: (goalId: string) => Promise<void>;
}

export const useStore = create<GoalStore>((set) => ({
  goals: [],
  isLoading: false,
  fetchGoals: async () => {
    set({ isLoading: true });
    try {
      const data = await fetchGoals();
      set({ goals: data, isLoading: false });
    } catch (error) {
      toast.error("Failed to fetch goals. Please try again.");
      set({ isLoading: false });
    }
  },
  createGoal: async (newGoal: Goal) => {
    set({ isLoading: true });
    try {
      await createGoal(newGoal);
      await useStore.getState().fetchGoals();
      toast.success("Goal created successfully!");
    } catch (error) {
      toast.error("Failed to create goal. Please try again.");
    } finally {
      set({ isLoading: false });
    }
  },
  updateGoal: async (updatedGoal: Goal) => {
    set({ isLoading: true });
    try {
      await updateGoal(updatedGoal);
      await useStore.getState().fetchGoals();
      toast.success("Goal updated successfully!");
    } catch (error) {
      toast.error("Failed to update goal. Please try again.");
    } finally {
      set({ isLoading: false });
    }
  },
  deleteGoal: async (goalId: string) => {
    set({ isLoading: true });
    try {
      await deleteGoal(goalId);
      await useStore.getState().fetchGoals();
      toast.success("Goal deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete goal. Please try again.");
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useStore;