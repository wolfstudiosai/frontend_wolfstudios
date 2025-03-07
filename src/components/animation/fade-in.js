import React from 'react';
import { motion, useInView } from 'framer-motion';

export const FadeIn = ({ children, duration = 0.5, delay = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }} 
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
};
