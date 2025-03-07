import { motion } from 'framer-motion';

export const FadeIn = ({ children, duration = 0.5, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 2 }} // y: 30 moves it slightly down initially
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
};
