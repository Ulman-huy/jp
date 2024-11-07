import { GEMINI_API_KEY } from "@/configs/contains";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const generatePrompt = (question: string, answer: string) => {
  return `
    Hiragana:"${question}".
    Romaji:"${answer}". 
    Kiểm tra xem câu văn Romaji có đúng với câu văn Hiragana không?.
    Trả về kết quả số điểm với công thức: (số lượng ký tự đúng / số lượng ký tự của câu văn Hiragana) * 100.
    Chỉ trả về kết quả số điểm.
    Không có ký tự nào khác.
    Không giải thích gì thêm.
  `;
};
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { answer, question } = body;
  const prompt = generatePrompt(answer, question);
  const response = await model.generateContent([prompt]);
  return NextResponse.json(response);
};

export { POST };
