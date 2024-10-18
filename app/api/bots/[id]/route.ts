// File: app/api/bots/[id]/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("bots")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) throw error;

    return NextResponse.json({ message: "Bot retrieved successfully", data });
  } catch (error) {
    console.error("Error fetching bot:", error);
    return NextResponse.json({ error: "Failed to fetch bot" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const botData = await request.json();
    const { data, error } = await supabase
      .from("bots")
      .update(botData)
      .eq("id", params.id)
      .single();

    if (error) throw error;

    return NextResponse.json({ message: "Bot updated successfully", data });
  } catch (error) {
    console.error("Error updating bot:", error);
    return NextResponse.json(
      { error: "Failed to update bot" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase.from("bots").delete().eq("id", params.id);

    if (error) throw error;

    return NextResponse.json({ message: "Bot deleted successfully" });
  } catch (error) {
    console.error("Error deleting bot:", error);
    return NextResponse.json(
      { error: "Failed to delete bot" },
      { status: 500 }
    );
  }
}
