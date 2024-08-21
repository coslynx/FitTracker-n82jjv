"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchUser } from "@/api/users";
import { fetchFitnessData } from "@/api/fitness";
import { toast } from "react-hot-toast";
import { User } from "@/types";
import { ProgressChart } from "@/components/ProgressChart";

interface ActivityTrackerCardProps {
  userId: string;
}

const ActivityTrackerCard = ({ userId }: ActivityTrackerCardProps) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [fitnessData, setFitnessData] = useState<any[]>([]);

  const fetchUserData = async () => {
    try {
      const fetchedUser = await fetchUser(userId);
      setUser(fetchedUser);
    } catch (error) {
      toast.error("Failed to fetch user data. Please try again.");
    }
  };

  const fetchFitnessDataForuser = async () => {
    try {
      const data = await fetchFitnessData(userId);
      setFitnessData(data);
    } catch (error) {
      toast.error("Failed to fetch fitness data. Please try again.");
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchFitnessDataForuser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{user.username}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ProgressChart fitnessData={fitnessData} />
      )}
    </div>
  );
};

export default ActivityTrackerCard;