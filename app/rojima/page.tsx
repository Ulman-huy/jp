"use client";

import { checkHiragana, createHiragana } from "@/actions";
import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import LoadingIcon from "@/components/ui/LoadingIcon";
import Modal from "@/components/ui/Modal";
import StreamText from "@/components/ui/StreamText";
import TextInput from "@/components/ui/TextInput";
import useToast from "@/hooks/useToast";
import clsx from "clsx";
import { useState } from "react";
import { RxReload } from "react-icons/rx";

const SubHiragana = () => {
  const [content, setContent] = useState("");
  const [value, setValue] = useState("");
  const [point, setPoint] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<
    { question: string; answer: string; point: number }[]
  >([]);
  const { toastError } = useToast();
  const handleCreateHiragana = async () => {
    try {
      setContent("");
      setValue("");
      const res = await createHiragana({
        history: history.map((item) => item.question).join(","),
      });
      setContent(res.response.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong. Try again!");
    }
  };

  const handleCheckHiragana = async () => {
    try {
      setLoading(true);
      const res = await checkHiragana({ answer: value, question: content });
      const poitionString = res.response.candidates[0].content.parts[0].text;
      setPoint(Math.ceil(parseFloat(poitionString)));
      setOpenModal(true);
      setHistory((prev) => {
        return [
          {
            question: content,
            answer: value,
            point: Math.ceil(parseFloat(poitionString)),
          },
          ...prev,
        ];
      });
    } catch (error) {
      console.log(error);
      toastError("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    handleCreateHiragana();
    setOpenModal(false);
  };

  return (
    <div className="p-4 flex flex-col pt-14 items-center justify-center">
      <div className="border border-white/50 p-4 rounded-lg md:text-[50px] max-md:text-2xl lg:min-h-[110px] min-h-[50px] text-center transition">
        <StreamText
          className="md:h-[94px] h-[50px]"
          content={content}
          showCursor={false}
        />
      </div>
      <Button
        onClick={handleCreateHiragana}
        className="mt-10 py-3 px-10 rounded-lg flex items-center gap-4 uppercase font-bold"
      >
        <RxReload /> Random
      </Button>
      <div className="md:mt-20 mt-10 max-w-[500px] w-full">
        <TextInput
          value={value}
          setValue={setValue}
          placeholder="Enter your answer ..."
          className="border border-white/20"
        />
        <Button
          onClick={handleCheckHiragana}
          className={clsx(
            "mt-6 w-full !bg-[#B03052] flex justify-center items-center py-3 px-10 rounded-lg gap-4 uppercase font-bold",
            loading ? "opacity-50 pointer-events-none" : ""
          )}
        >
          Check {loading && <LoadingIcon className="size-5" />}
        </Button>
      </div>

      <div className="mt-14 max-w-[500px] w-full">
        <div className="flex items-center gap-4">
          <span className="w-full h-[1px] flex-1 bg-white/5 block"></span>
          <p className="font-medium text-white/50 uppercase">History</p>
          <span className="w-full h-[1px] flex-1 bg-white/5 block"></span>
        </div>
        <div className="max-h-[500px] overflow-y-auto scrollbar-hide">
          {history.length > 0 ? (
            history.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 mt-3 border-b pb-2 border-white/5"
              >
                <div className="text-sm text-white/50 line-clamp-1">
                  <p>{item.question}</p>
                  <p className="text-white/80 line-clamp-1">{item.answer}</p>
                </div>
                <span className="text-2xl font-semibold text-[#03DEAA] flex-shrink-0">
                  {item.point}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center text-white/50 mt-20">
              No history yet!
            </div>
          )}
        </div>
      </div>

      <Modal
        open={openModal}
        isBackground
        onClose={() => setOpenModal(false)}
        className="max-w-[500px] w-full"
      >
        <div className="pt-10">
          <div className="text-[150px]/[150px] font-bold flex justify-center">
            <CountUp from={0} to={point} />
          </div>
          <Button
            onClick={handleTryAgain}
            className="mt-16 w-full !bg-[#B03052] py-3 px-10 rounded-lg gap-4 uppercase font-bold"
          >
            Try again
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SubHiragana;
