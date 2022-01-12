import { FunctionComponent } from "react";
import { motion } from "framer-motion";

export const Title: FunctionComponent = ({ children }) => (
  <motion.h1
    initial={{ opacity: 0.2, marginLeft: "-1rem" }}
    animate={{
      opacity: 1,
      marginLeft: 0
    }}
    transition={{
      type: "spring",
      stiffness: 420,
      damping: 20
    }}
    className="mt-20 mb-8 text-2xl font-extrabold text-gray-800 md:max-w-4xl sm:text-3xl"
  >
    {children}
  </motion.h1>
);
