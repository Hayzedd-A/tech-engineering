"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { validateEmail } from "@/lib/utils";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      console.log(error)
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-blue-50 rounded-lg p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
      <p className="text-gray-600 mb-6">
        Get the latest tech tips and repair advice delivered to your inbox
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex gap-4 mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>

        {message && (
          <p
            className={`text-sm ${
              message.includes("Thank you") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
