"use client";
import { AnimatePresence, motion } from "framer-motion";

const PageTransition = () => {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="initial-transition"
          animate={{ height: "0vh" }}
          exit={{ height: "100vh" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-screen w-screen fixed bg-black rounded-b-[100px] z-[45]"
        />
        <motion.div
          key="welcome-message"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="h-fit w-fit fixed m-auto top-0 bottom-0 left-0 right-0 text-white text-center cursor-default text-6xl z-[47] capitalize lg:text-7xl"
          style={{ pointerEvents: "none" }}
        >
          Welcome to Whitesky Aviation
        </motion.div>
        <motion.div
          key="exit-transition"
          animate={{ height: "0vh", transition: { delay: 0.5 } }}
          initial={{ height: "100vh" }}
          className="h-screen w-screen fixed bg-black rounded-t-[100px] bottom-0 z-[40]"
        />
      </AnimatePresence>
    </>
  );
};

export default PageTransition;
