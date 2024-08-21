"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUserGoals, fetchUser } from "@/api/goals";
import { fetchFitnessData } from "@/api/fitness";
import { toast } from "react-hot-toast";
import { Goal } from "@/types";
import { GoalList } from "@/components/GoalList";
import { ProgressChart } from "@/components/ProgressChart";
import { User } from "@/types";

const DashboardPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [fitnessData, setFitnessData] = useState<any[]>([]);
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

  const fetchUserData = async () => {
    try {
      const fetchedUser = await fetchUser(session?.user?.id as string);
      setUser(fetchedUser);
    } catch (error) {
      toast.error("Failed to fetch user data. Please try again.");
    }
  };

  const fetchFitnessDataForuser = async () => {
    if (user?.id) {
      try {
        const data = await fetchFitnessData(user.id);
        setFitnessData(data);
      } catch (error) {
        toast.error("Failed to fetch fitness data. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchGoalsData();
      fetchUserData();
    }
  }, [session]);

  useEffect(() => {
    fetchFitnessDataForuser();
  }, [user]);

  if (!session) {
    return <div>Please login to view your dashboard</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Goals</h2>
          <GoalList
            goals={goals}
            isLoading={isLoading}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
          <ProgressChart fitnessData={fitnessData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;