"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchUser } from "@/api/users";
import { User } from "@/types";

const UserProfile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const fetchedUser = await fetchUser(session?.user?.id as string);
      setUser(fetchedUser);
    } catch (error) {
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchUserData();
    }
  }, [session]);

  if (!session) {
    return <div>Please login to view your profile</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-2">Username: {user?.username}</h2>
        <p className="text-gray-700 mb-2">Email: {user?.email}</p>
        {/* Add more profile information as needed */}
      </div>
    </div>
  );
};

export default UserProfile;