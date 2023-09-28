import React from 'react'
import { motion } from 'framer-motion';

const about = () => { const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
        <motion.div
        className="bg-gray-100 py-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto p-40 w-full h-full ">
          <motion.h1 className="text-4xl font-bold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            About Our Shoe Store
          </motion.h1>
          <motion.p className="text-gray-600 mb-8 text-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
            Welcome to our shoe store, where style meets comfort! We are dedicated to providing high-quality footwear to our customers.
          </motion.p>
          {/* Add more animated content here */}
        </div>
      </motion.div>
    );
  }

export default about