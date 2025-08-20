"use client";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
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
    <footer className="w-full bg-[#172D44]/6 shadow text-[#00032E] pt-12">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Store Categories */}
        <div className="text-[#00032E]">
          <h4 className="font-semibold mb-4 text-[#00032E]/50">
            Store Categories
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-900">
                Shopping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Dining
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Fashion & Lifestyle
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Services
              </a>
            </li>
          </ul>
        </div>

        {/* About */}
        <div className="text-[#00032E]">
          <h4 className="font-semibold mb-4 text-[#00032E]/50">About</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-900">
                About Riverland
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Campaigns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Expos
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="text-[#00032E]">
          <h4 className="font-semibold mb-4 text-[#00032E]/50 ">Contact Us</h4>
          <p className="mb-2">
            Mobile:{" "}
            <a href="tel:+254115771888" className="hover:text-gray-900">
              +254 115 771888
            </a>
          </p>
          <p className="mb-4">
            Enquiries Email:{" "}
            <a
              href="mailto:info@riverland.co.ke"
              className="hover:text-gray-900"
            >
              info@riverland.co.ke
            </a>
          </p>
          <div className="flex space-x-4 text-[D6A829]">
            <a href="#">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="#">
              <i className="fab fa-x-twitter text-xl"></i>
            </a>
            <a href="#">
              <i className="fab fa-tiktok text-xl"></i>
            </a>
          </div>
        </div>

        {/* Logo + Newsletter */}
        <div className="flex flex-col items-start md:items-end">
          {/* Logo */}
          <div className="mb-4 flex-shrink-0">
            <Image src="/darkLogo.svg" width={174} height={36} alt="Logo" />
          </div>

          {/* Newsletter */}
          <h4 className="font-medium text-[#00032E]">
            Subscribe For <span className="text-[#D6A829]">Our Newsletter</span>
          </h4>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex  w-full max-w-lg  gap-x-2 px-2"
          >
            <input
              type="email"
              placeholder="Please Enter Your E-Mail Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-l-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none w-full md:w-72"
              required
            />
            <button className="bg-[#D6A829] px-4 rounded-r-md text-[#00032E]">
              <i className="fas fa-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-400">
        <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-[#00032E]">
          <p>
            © RIVERLAND 2025 • All rights reserved. Any redistribution or
            reproduction of part or all of the contents and images in any form
            is prohibited.
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-gray-900">
              Terms of Use
            </a>
            <a href="#" className="hover:text-gray-900">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
