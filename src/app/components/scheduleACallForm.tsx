"use client";

import { useState } from "react";

export default function ScheduleCallCard() {
  const [formData, setFormData] = useState({
    company: "Domino’s Pizza",
    phone: "+254 647 75940",
    email: "info@dominospizaa.com",
    date: "2025-08-15",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // stop form reload

    try {
      const response = await fetch("/api/scheduledCalls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Form data submitted:", formData);

      if (response.ok) {
        alert("Sent successfully!");
        setFormData({
          company: "",
          phone: "",
          email: "",
          date: "",
        });
      } else {
        const errorData = await response.json(); // get error msg from API
        alert(
          `Failed to send message: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form
        action=""
        onSubmit={handleSubmit}
        className="relative flex items-center justify-between bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg px-6 py-4 max-w-6xl mx-auto"
      >
        <div className="flex flex-col ml-4">
          <label className="text-sm text-[#E7E9EB]">Business Name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="bg-transparent font-semibold focus:outline-none text-[#E7E9EB] text-center"
          />
        </div>

        <span className="hidden md:block text-[#E7E9EB] mr-4">|</span>

        {/* Phone */}
        <div className="flex flex-col ml-4">
          <label className="text-sm text-[#E7E9EB]">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="bg-transparent font-semibold focus:outline-none text-[#E7E9EB] text-center"
          />
        </div>

        <span className="hidden md:block text-[#E7E9EB] mr-4">|</span>

        {/* Email */}
        <div className="flex flex-col ml-4">
          <label className="text-sm text-[#E7E9EB]">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-transparent font-semibold focus:outline-none text-[#E7E9EB] text-center"
          />
        </div>

        <span className="hidden md:block text-[#E7E9EB] mr-4">|</span>
        <div className="flex flex-col mx-4">
          <label className="text-sm text-[#E7E9EB]">Call Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="bg-transparent font-semibold focus:outline-none text-[#E7E9EB] text-center"
          />
        </div>
        <button
          type="submit"
          className="bg-[#D6A829] text-[#00032E] font-semibold px-5 py-2 rounded-lg shadow-md transition"
        >
          Schedule a Call
        </button>
      </form>
    </div>
  );
}
