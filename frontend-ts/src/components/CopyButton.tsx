import React, { useRef, useState } from "react";
import "./form2.css";

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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={copyToClipboard}
      >
        {!copy ? "Copy URL" : "Copied"}
      </button>
    </div>
  );
};

export default CopyButton;
