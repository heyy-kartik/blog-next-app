"use client";
import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import { ModeToggle } from "./toggle-dark";
import { toast } from "react-hot-toast";

const Header = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscription = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Successfully subscribed! 🎉");
        setEmail(""); // Clear the input
      } else {
        toast.error(data.error || "Subscription failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <header className="w-full px-4 md:px-12 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Image
          src={assets.logo}
          className="w-[130px]"
          width={180}
          height={100}
          alt="Header Image"
        />

        <button className="flex items-center gap-2 px-6 py-3 font-medium cursor-pointer shadow-lg bg-white hover:bg-gray-50 border border-gray-200 transition-colors duration-200 rounded-lg">
          Get Started
          <Image src={assets.arrow} alt="arrow icon" className="w-4 h-4" />
        </button>
        <ModeToggle />
      </div>

      <div className="text-center max-w-3xl mx-auto mt-10">
        <h1 className="text-3xl font-semibold text-center">Latest Blogs</h1>
        <p className="text-sm mt-7 text-gray-700">
          Subscribe to our newsletter and never miss the latest articles,
          tutorials, and insights from our blog.
        </p>

        <form
          onSubmit={handleSubscription}
          className="flex justify-center mt-8 max-w-[600px] mx-auto gap-3 shadow-[-7px_10px_0px_#000]"
        >
          <input
            className="border border-gray-300 pl-4 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none py-4"
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gray-800 text-white px-6 py-4 hover:bg-gray-700 active:bg-gray-900 font-medium text-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
