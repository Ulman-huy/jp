"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TiHome } from "react-icons/ti";

const BackToHome = () => {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <Link
      href="/"
      className="text-[#B03052] text-lg border border-white/10 bg-white/5 flex fixed p-1.5 left-4 top-2 rounded-full"
    >
      <TiHome />
    </Link>
  );
};

export default BackToHome;
