import React from "react";

export const BottomSheet = ({ isOpen, setIsOpen , title , children }) => {
  return (
    <div className="relative">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />
      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white text-black rounded-t-2xl shadow-lg p-6 transition-transform duration-300 z-50 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};
