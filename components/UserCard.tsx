"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchUser } from "@/api/users";
import { fetchFitnessData } from "@/api/fitness";
import { toast } from "react-hot-toast";
import { User } from "@/types";
import { ProgressChart } from "@/components/ProgressChart";

interface UserCardProps {
  user: {
    id: string;
    username: string;
    // ... other user properties
  };
}

const UserCard = ({ user }: UserCardProps) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [fitnessData, setFitnessData] = useState<any[]>([]);

  const fetchFitnessDataForuser = async () => {
    try {
      const data = await fetchFitnessData(user.id);
      setFitnessData(data);
    } catch (error) {
      toast.error("Failed to fetch fitness data. Please try again.");
    }
  };

  useEffect(() => {
    fetchFitnessDataForuser();
  }, [user]);

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

export default UserCard;