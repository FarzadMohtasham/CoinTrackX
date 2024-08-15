import { ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const PageTransition = ({ children }: { children: ReactElement }) => {
   const pageTransition: any = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
   };

   return (
      <motion.div
         initial="initial"
         animate="animate"
         exit="exit"
         transition={{ duration: 0.5 }}
         variants={pageTransition}
      >
         {children}
      </motion.div>
   );
};
