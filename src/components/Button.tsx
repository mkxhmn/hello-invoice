import { motion } from "framer-motion";
import { ButtonHTMLAttributes, FunctionComponent } from "react";

export const Button: FunctionComponent<ButtonHTMLAttributes<
  HTMLButtonElement
>> = props => (
  //@ts-ignore
  <motion.button
    className="bg-gray-800 text-gray-100 py-2 px-4 rounded-lg shadow-md"
    whileHover={{
      scale: 1.03
    }}
    whileTap={{
      scale: 0.97
    }}
    {...props}
  >
    {props.children}
  </motion.button>
);
