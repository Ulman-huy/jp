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

export { checkDraw };
