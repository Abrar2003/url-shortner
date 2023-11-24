import React, { useRef, useState } from "react";
import "./form2.css";
import { CopyIcon } from "@radix-ui/react-icons";
interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [copy, setCopy] = useState<boolean>(false);

  const copyToClipboard = () => {
    setCopy(true);
    if (textAreaRef.current) {
      // Create a temporary textarea element
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;

      // Make the textarea invisible
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";

      document.body.appendChild(textarea);

      // Select and copy the text
      const range = document.createRange();
      const selection = document.getSelection();
      range.selectNode(textarea);
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand("copy");

        // Clean up
        document.body.removeChild(textarea);
        setTimeout(() => {
          setCopy(false);
        }, 3000);
      }
    }
  };

  return (
    <div id="copybtn">
      <textarea
        ref={textAreaRef}
        style={{ position: "absolute", left: "-9999px" }}
        readOnly
        value={textToCopy}
      />
      {!copy?<button
        className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={copyToClipboard}
      >
        <CopyIcon color="white" width={16} height={16} />
      </button>:''}
      {copy?<button
        className="bg-blue-600 hover:bg-blue-900 text-white py-1 px-2 text-md rounded focus:outline-none focus:shadow-outline"
        onClick={copyToClipboard}
      >
        Copied
      </button>:''}
    </div>
  );
};

export default CopyButton;
