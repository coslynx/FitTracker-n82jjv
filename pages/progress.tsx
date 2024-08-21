"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUser, updateUser } from "@/api/users";
import { toast } from "react-hot-toast";
import { User } from "@/types";
import { ProgressChart } from "@/components/ProgressChart";
import { fetchFitnessData } from "@/api/fitness";

const ProgressPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fitnessData, setFitnessData] = useState<any[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedUser = {
      ...user,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
    };

    setIsLoading(true);
    try {
      await updateUser(updatedUser);
      setUser(updatedUser);
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("Failed to update user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      const fetchUserData = async () => {
        try {
          const fetchedUser = await fetchUser(session.user.id);
          setUser(fetchedUser);
        } catch (error) {
          toast.error("Failed to fetch user data. Please try again.");
        }
      };

      fetchUserData();
    }
  }, [session]);

  useEffect(() => {
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

    fetchFitnessDataForuser();
  }, [user]);

  if (!session) {
    return <div>Please login to view your progress</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Your Progress</h1>
      <ProgressChart fitnessData={fitnessData} />
    </div>
  );
};

export default ProgressPage;