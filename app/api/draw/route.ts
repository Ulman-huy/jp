import { GEMINI_API_KEY } from "@/configs/contains";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const generatePrompt = (label: string) => {
  return `Kiểm tra hình vẽ có chính xác với chữ ${JSON.stringify(
    label
  )} hay không?. Và chính xác bao nhiêu phần trăm. Chỉ trả về kết quả số phần trăm.`;
};
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { image, letter } = body;
  const prompt = generatePrompt(letter);
  const response = await model.generateContent([prompt, image]);
  return NextResponse.json(response);
};

export { POST };
