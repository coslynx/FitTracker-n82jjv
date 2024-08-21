"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchUser } from "@/api/users";
import { fetchFitnessData } from "@/api/fitness";
import { toast } from "react-hot-toast";
import { User } from "@/types";
import { ProgressChart } from "@/components/ProgressChart";
import { Modal } from "@/components/Modal";

interface GoalCardProps {
  goal: {
    id: string;
    title: string;
    description: string;
    userId: string;
    // ... other goal properties
  };
}

const GoalCard = ({ goal }: GoalCardProps) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fitnessData, setFitnessData] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

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
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{goal.title}</h2>
        <button
          onClick={() => setShowModal(true)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
      <p className="text-gray-700 mb-4">{goal.description}</p>
      <ProgressChart fitnessData={fitnessData} />
      <Modal
        show={showModal}
        setShow={setShowModal}
        goalId={goal.id}
      />
    </div>
  );
};

export default GoalCard;