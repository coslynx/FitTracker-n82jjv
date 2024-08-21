"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchUser } from "@/api/users";
import { fetchFitnessData } from "@/api/fitness";
import { toast } from "react-hot-toast";
import { User } from "@/types";
import { ProgressChart } from "@/components/ProgressChart";

interface ProgressCardProps {
  goalId: string;
}

const ProgressCard = ({ goalId }: ProgressCardProps) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fitnessData, setFitnessData] = useState<any[]>([]);

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
      fetchUserData();
    }
  }, [session]);

  useEffect(() => {
    fetchFitnessDataForuser();
  }, [user]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">Progress</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ProgressChart fitnessData={fitnessData} />
      )}
    </div>
  );
};

export default ProgressCard;