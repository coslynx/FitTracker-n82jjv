"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AboutPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    return <div>Please login to view this page</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About FitTrack</h1>
      <p>
        FitTrack is a web application designed to help fitness enthusiasts track
        their progress, stay motivated, and connect with like-minded individuals.
      </p>
      <p>
        Our mission is to provide a user-friendly platform that makes fitness
        tracking easy, enjoyable, and empowering. We believe that everyone can
        achieve their fitness goals with the right tools and support.
      </p>
      <p>
        We're a team of passionate fitness enthusiasts who are dedicated to
        building a community where everyone can thrive. Join us on our journey to
        make fitness fun and accessible for all!
      </p>
    </div>
  );
};

export default AboutPage;