import React from "react";
import { IoMdClose } from "react-icons/io";

export const EditModal = ({ children, setIsOpen, title, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white rounded-xl w-full max-w-md p-6 mx-4"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <span className="cursor-pointer" onClick={() => setIsOpen(false)}>
            <IoMdClose size={24} />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};
