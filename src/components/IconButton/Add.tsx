import { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

export const Add = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  //@ts-ignore
  <motion.button
    className="text-gray-400 bg-opacity-50 shadow-md rounded-xl p-2 backdrop-filter backdrop-blur firefox:bg-opacity-90"
    {...props}
    whileHover={{
      scale: 1.1
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 4v16m8-8H4"
      />
    </svg>
  </motion.button>
);
