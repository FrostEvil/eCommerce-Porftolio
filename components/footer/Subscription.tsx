"use client";

import { toast } from "@/hooks/use-toast";
import { subscriptionMailSchema } from "@/utils/formSchemas";
import { ChangeEvent, useState } from "react";

export default function Subscription() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationResult = subscriptionMailSchema.safeParse({
      email: inputValue,
    });
    if (validationResult.success) {
      toast({
        description: "You have successfully subscribed!",
      });
      setInputValue("");
    } else {
      const errorMessage = validationResult.error.errors[0]?.message;
      console.log(errorMessage);
      toast({
        variant: "destructive",
        description:
          errorMessage || "Failed to subscribe. Please check your email.",
      });
    }
  };
  return (
    <>
      <p className="mt-4 text-sm">Subscribe to our newsletter</p>
      <form onSubmit={handleSubmit}>
        <div className="mt-2 flex">
          <input
            type="email"
            placeholder="Your email"
            value={inputValue}
            onChange={handleChange}
            className="p-2 w-full text-black rounded-l-md"
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black px-4 py-2 rounded-r-md hover:bg-yellow-500"
          >
            Subscribe
          </button>
        </div>
      </form>
    </>
  );
}
