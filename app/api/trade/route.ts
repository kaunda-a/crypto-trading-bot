// File: app/api/trade/route.ts

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const tradeData = await request.json();

    // Use Gemini AI to confirm trade decision
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Given the following trade data: ${JSON.stringify(
      tradeData
    )}, should this trade be executed? Provide a brief analysis.`;
    const result = await model.generateContent(prompt);
    const aiDecision = result.response.text();

    // Here you would typically execute the trade if AI approves
    // For this example, we'll just return the AI decision
    return NextResponse.json({ message: "Trade analyzed", aiDecision });
  } catch (error) {
    console.error("Error executing trade:", error);
    return NextResponse.json(
      { error: "Failed to execute trade" },
      { status: 500 }
    );
  }
}
