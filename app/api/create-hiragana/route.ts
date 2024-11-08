import { GEMINI_API_KEY } from "@/configs/contains";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// @typescript-eslint/no-explicit-any
const generatePrompt = (history: string) => {
  return `Tạo cho tôi 1 câu văn ngẫu nhiên chỉ sử dụng bằng "Hiragana". Câu văn này phải khác với câu văn trong "${history}". Và chỉ trả về câu văn.`;
};
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { history } = body;
  const prompt = generatePrompt(history);
  const response = await model.generateContent([prompt]);
  return NextResponse.json(response);
};

export { POST };
