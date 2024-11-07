import fetchApi from "@/plugins/fetchApi";

const checkDraw = async ({
  image,
  letter,
}: {
  image: { inlineData: { data: unknown; mimeType: string } } | null;
  letter: string;
}) => {
  const res = await fetchApi.post("/draw", { image, letter });
  return res;
};

const createHiragana = async ({ history }: { history: any }) => {
  const res = await fetchApi.post("/create-hiragana", { history });
  return res;
};

const checkHiragana = async ({
  answer,
  question,
}: {
  answer: string;
  question: string;
}) => {
  const res = await fetchApi.post("/sub-hiragana", { answer, question });
  return res;
};

export { checkDraw, createHiragana, checkHiragana };
