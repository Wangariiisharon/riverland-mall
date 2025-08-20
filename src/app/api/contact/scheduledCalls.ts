import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, date, phone, company } = body;

    // Define the document
    const doc = {
      _type: "scheduleCall", // The schema type defined in Sanity
      email,
      date,
      phone,
      company,
    };

    // Use the Sanity client to create a new document
    const result = await client.create(doc);

    // Return  successful
    return NextResponse.json({ message: "Success", result }, { status: 201 });
  } catch (error) {
    console.error("Error submitting form:", error);
    // Return an error
    return NextResponse.json(
      { message: "Error submitting form please" },
      { status: 500 }
    );
  }
}

// company: "Domino’s Pizza",
// phone: "+254 647 75940",
// email: "info@dominospizaa.com",
// date: "2025-08-15",
