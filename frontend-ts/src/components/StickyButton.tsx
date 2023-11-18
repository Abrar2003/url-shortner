import React, { MouseEvent } from "react";

interface StickyButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  label: string;
}

const StickyButton: React.FC<StickyButtonProps> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {label}
    </button>
  );
};

export default StickyButton;
