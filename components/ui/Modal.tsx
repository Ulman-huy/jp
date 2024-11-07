"use client";

import { useEffect, useState } from "react";
import ReactPortal from "./ReactPortal";
import clsx from "clsx";
interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  isBackground?: boolean;
  className?: string;
}

const Modal = ({
  children,
  open,
  onClose,
  isBackground = true,
  className,
}: ModalProps) => {
  const [animate, setAnimate] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.marginRight = "0";
    };
  }, []);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? onClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setAnimate(true);
      return;
    }
    if (!isFirst && !open) {
      setIsFirst(true);
      return;
    }
    const timer = setTimeout(() => {
      if (!open) {
        setAnimate(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [open, isFirst]);

  if (!open && !animate) return null;

  return (
    <ReactPortal wrapperId="modal">
      <div
        className={clsx(
          "fixed inset-0 bg-black-50/30 backdrop-blur-sm transition-opacity opacity-0 z-50 flex items-center justify-center",
          open ? "!opacity-100" : ""
        )}
      >
        <div className="absolute inset-0" onClick={onClose} />
        <div
          className={clsx(
            "z-10 min-w-[300px] mx-auto bg-[#0a0a0a]",
            open ? "modal__show" : "modal__hide",
            isBackground
              ? "bg-black-50/90 border border-white/10 p-4 rounded-lg"
              : "",
            className
          )}
          style={
            isBackground
              ? {
                  boxShadow: " 0px 4px 12px 0px rgba(0, 0, 0, 0.60)",
                }
              : {}
          }
        >
          {children}
        </div>
      </div>
    </ReactPortal>
  );
};
export default Modal;
