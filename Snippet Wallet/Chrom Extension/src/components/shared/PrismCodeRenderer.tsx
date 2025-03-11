import { useEffect } from "react";
import * as Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import { FaCopy } from "react-icons/fa";
import toast from "react-hot-toast";

const PrismCodeRenderer = ({
  code,
  language = "javascript",
  asInputField = false,
  isRequired = true,
  name,
  label,
  handleChange,
  noOfRows,
  maxChar,
}: {
  code: string;
  language: string;
  asInputField?: boolean;
  label?: string;
  name?: string;
  handleChange?: (value: string) => void;
  noOfRows?: number;
  maxChar?: number;
  isRequired?: boolean;
}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  return (
    <pre className="relative">
      {asInputField ? (
        <span className="input">
          <textarea
            name={name}
            onChange={(e) => {
              handleChange!(e.target.value);
            }}
            value={code}
            rows={noOfRows || 10}
            required={isRequired}
            className={`language-${language} relative`}
          />
          <label htmlFor={name}>{label}</label>
          {maxChar && (
            <span className="absolute right-1 bottom-0 text-sm">{`${code.length}/${maxChar}`}</span>
          )}
        </span>
      ) : (
        <code className={`language-${language} relative`}>{code}</code>
      )}
      <FaCopy
        className="text-white absolute top-1 right-1"
        onClick={() => {
          toast.success("Code Copied");
        }}
      />
    </pre>
  );
};

export default PrismCodeRenderer;
