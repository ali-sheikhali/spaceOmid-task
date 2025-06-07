"use client";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center  text-white">
      <Loader2 className="animate-spin mb-4 w-10 h-10 text-[#092748]" />
    </div>
  );
}
