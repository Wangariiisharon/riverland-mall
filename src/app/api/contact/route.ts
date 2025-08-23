import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    // Define the document
    const doc = {
      _type: "subscriber", // The schema type defined in Sanity
      email,
      AddedAt: new Date().toISOString(),
    };

    // Use the Sanity client to create a new document
    const result = await client.create(doc);

    // Return  successful
    return NextResponse.json({ message: "Success", result }, { status: 201 });
  } catch (error) {
    console.error("Error submitting form:", error);
    // Return an error
    return NextResponse.json(
      { message: "Error submitting form" },
      { status: 500 }
    );
  }
}
