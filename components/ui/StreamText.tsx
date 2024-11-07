"use client";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

interface StreamTextProps {
  content: string;
  speed?: number;
  showCursor?: boolean;
  onComplete?: () => void;
  className?: string;
}

const StreamText = ({
  content,
  speed = 30,
  showCursor = true,
  onComplete,
  className,
}: StreamTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const streamText = useCallback(() => {
    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + content[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [content, currentIndex, speed, isComplete, onComplete]);

  useEffect(() => {
    streamText();
  }, [streamText]);

  useEffect(() => {
    // Reset khi content thay đổi
    setDisplayText("");
    setCurrentIndex(0);
    setIsComplete(false);
  }, [content]);

  return (
    <div className="relative">
      <div
        className="whitespace-pre-wrap text-white/80"
        dangerouslySetInnerHTML={{
          __html: displayText
            .replace(/\n/g, "<br>")
            .replace(/\s{2,}/g, (match) => "&nbsp;".repeat(match.length)),
        }}
      />
      {showCursor && !isComplete && (
        <span
          className={clsx(
            "absolute inline-block w-0.5 bg-white/80 ml-1",
            "animate-pulse",
            className
          )}
        />
      )}
    </div>
  );
};

export default StreamText;
