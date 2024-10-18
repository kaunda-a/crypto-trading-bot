// File: app/api/market-data/route.ts

import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    // Replace with your preferred crypto data API
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      }
    );

    return NextResponse.json({
      message: "Market data retrieved successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Error fetching market data:", error);
    return NextResponse.json(
      { error: "Failed to fetch market data" },
      { status: 500 }
    );
  }
}
