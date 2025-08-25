"use client";

import { useState } from "react";
import toast from "react-hot-toast";

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
    e.preventDefault();

    try {
      const response = await fetch("/api/scheduledCalls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ company: "", phone: "", email: "", date: "" });
        toast.success("We'll reach out to you soon!");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="w-full flex justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col md:flex-row items-center md:justify-between gap-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg px-6 py-4 max-w-6xl mx-auto w-full"
      >
        {/* Company */}
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-sm text-[#E7E9EB] mb-1">Business Name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="bg-transparent font-semibold focus:outline-none text-[#E7E9EB] text-center md:border-none border-b border-white/40 focus:border-[#D6A829] transition w-full"
          />
        </div>

        <span className="hidden md:block text-[#E7E9EB]">|</span>

        {/* Phone */}
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-sm text-[#E7E9EB] mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="bg-transparent font-semibold focus:outline-none text-[#E7E9EB]  text-center md:border-none  border-b border-white/40 focus:border-[#D6A829] transition w-full"
          />
        </div>

        <span className="hidden md:block text-[#E7E9EB]">|</span>

        {/* Email */}
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-sm text-[#E7E9EB] mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-transparent font-semibold focus:outline-none text-[#E7E9EB] text-center md:border-none    border-b border-white/40 focus:border-[#D6A829] transition w-full"
          />
        </div>

        <span className="hidden md:block text-[#E7E9EB]">|</span>

        {/* Date */}
        <div className="flex flex-col w-full md:w-auto text-[#E7E9EB]">
          <label className="text-sm text-[#E7E9EB] mb-1">Call Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="bg-transparent font-semibold focus:outline-none text-[#E7E9EB] text-center md:border-none border-b border-white/40 focus:border-[#D6A829] transition w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#D6A829] text-[#00032E] font-semibold px-6 py-3 rounded-lg shadow-md transition w-full md:w-auto mt-2 md:mt-0"
        >
          Schedule a Call
        </button>
      </form>
    </div>
  );
}
