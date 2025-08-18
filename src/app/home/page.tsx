"use client";
// import { Navbar } from "../components/nav";
import { useState } from "react";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const AddedAt = new Date().toISOString();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, AddedAt }),
      });

      if (response.ok) {
        alert("Sent successfully!");
        setEmail(""); // Clear the form
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <div className="h-screen w-full bg-[url(/hero-bg.jpg)] bg-cover bg-center relative">
      <div className="flex flex-col h-full">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h1 className="text-3xl md:text-7xl font-semibold tracking-wide text-white">
            COMING SOON!!
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-xl text-white">
            Subscribe to be the first to know when we open, all the events and
            offers available!
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex  w-full max-w-lg  gap-x-2 px-2"
          >
            <input
              type="email"
              placeholder="Please Enter Your E-Mail Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 text-black outline-none rounded-full bg-white"
              required
            />
            <button
              type="submit"
              className="bg-[#D6A829] text-white px-6 py-2 font-semibold rounded-full transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-300  mt-32">
            Looking to Rent a Space? Get in Touch.
          </p>
        </div>
      </div>
    </div>
  );
}
