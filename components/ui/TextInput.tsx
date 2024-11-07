import clsx from "clsx";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";

type TextInputProps = {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  placeholderClassName?: string;
  wrapperClassName?: string;
} & React.ComponentProps<"div">;

const TextInput: React.FC<TextInputProps> = ({
  value,
  setValue,
  className,
  placeholder,
  placeholderClassName,
  wrapperClassName,
  ...props
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState(value);

  const onChangeContent = () => {
    if (contentRef.current) {
      const newValue = contentRef.current.innerText;
      const sanitizedValue = DOMPurify.sanitize(newValue, { ALLOWED_TAGS: [] });
      setInternalValue(sanitizedValue);
      setValue(sanitizedValue);
    }
  };

  useEffect(() => {
    if (contentRef.current && value !== internalValue) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);

      contentRef.current.innerText = value;
      setInternalValue(value);
    }
  }, [value, internalValue]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      if (range) {
        const br = document.createElement("br");
        range.deleteContents();
        range.insertNode(br);
        range.setStartAfter(br);
        range.setEndAfter(br);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      onChangeContent();
    }
  };

  return (
    <div className={clsx("relative", wrapperClassName)}>
      <div
        ref={contentRef}
        contentEditable
        onInput={onChangeContent}
        onKeyDown={handleKeyDown}
        className={clsx(
          "p-3 text-sm rounded-lg whitespace-pre-wrap w-full border__10 text-white/80 transition-all bg-white/[0.03] outline-none focus:outline-none max-h-[250px] overflow-auto scroll__custom__textarea break-words",
          className
        )}
        {...props}
      ></div>
      {!internalValue && (
        <span
          className={clsx(
            "text-white/40 pointer-events-none absolute top-3 left-3 text-sm",
            placeholderClassName
          )}
        >
          {placeholder}
        </span>
      )}
    </div>
  );
};

export default TextInput;
