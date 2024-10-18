// File: app/api/performance/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bot = searchParams.get("bot");
  const timeFrame = searchParams.get("timeFrame");

  let query = supabase
    .from("bot_performance")
    .select("*")
    .order("date", { ascending: true });

  if (bot && bot !== "all") {
    query = query.eq("bot_name", bot);
  }

  if (timeFrame) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(timeFrame));
    query = query.gte("date", startDate.toISOString());
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const formattedData = data.map((entry) => ({
    date: entry.date,
    profit: parseFloat(entry.profit),
    trades: entry.trades,
  }));

  return NextResponse.json(formattedData);
}
