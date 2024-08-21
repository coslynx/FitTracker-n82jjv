"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useStore } from "@/hooks/useGoals";
import { fetchUser, updateUser } from "@/api/users";
import { toast } from "react-hot-toast";
import { User } from "@/types";

const SettingsPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { goals } = useStore();

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

  if (!session) {
    return <div>Please login to view settings</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={user?.username || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user?.email || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Goals</h2>
        <ul>
          {goals.map((goal) => (
            <li key={goal.id} className="mb-2">
              {goal.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SettingsPage;