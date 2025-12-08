import type { MotionProps } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";

type Para = MotionProps & React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const BaseModal = ({ isOpen=false, setOpen, children, ...props }: Para) => {


  return (
    <AnimatePresence>
      {isOpen && 
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            // Close modal when clicking outside content
            e.preventDefault();
            setOpen(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: "-100%" }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 25, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {children}
          </motion.div>
        </motion.div>
        }
    </AnimatePresence>
  )
}

export default BaseModal;