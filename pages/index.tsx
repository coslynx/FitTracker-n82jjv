"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/api/users";
import { fetchUserGoals } from "@/api/goals";
import { toast } from "react-hot-toast";
import { User } from "@/types";
import { GoalList } from "@/components/GoalList";

const HomePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [goals, setGoals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      const fetchedUser = await fetchUser(session?.user?.id as string);
      setUser(fetchedUser);
    } catch (error) {
      toast.error("Failed to fetch user data. Please try again.");
    }
  };

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

  useEffect(() => {
    if (session?.user) {
      fetchUserData();
      fetchGoalsData();
    }
  }, [session]);

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to FitTrack</h1>
        <p>Please login to continue.</p>
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.username}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Goals</h2>
          <GoalList goals={goals} isLoading={isLoading} />
        </div>
        {/* Additional content for the homepage */}
      </div>
    </div>
  );
};

export default HomePage;