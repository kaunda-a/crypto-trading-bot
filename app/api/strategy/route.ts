// File: app/api/ai-strategy/route.ts

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const marketData = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Given the following market data: ${JSON.stringify(
      marketData
    )}, suggest a trading strategy. Include potential entry and exit points, stop loss, and take profit levels.`;
    const result = await model.generateContent(prompt);
    const aiStrategy = result.response.text();

    return NextResponse.json({ message: "AI strategy generated", aiStrategy });
  } catch (error) {
    console.error("Error generating AI strategy:", error);
    return NextResponse.json(
      { error: "Failed to generate AI strategy" },
      { status: 500 }
    );
  }
}
