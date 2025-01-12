"use client";

import { motion, Variants } from "framer-motion";
import { Book } from "@/types";
import GoBackButton from "./ui/goBackButton";

const fadeIn: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function BookDetails({ book }: { book: Book }) {
  return (
    <motion.div
      className="p-4 pt-8 max-w-5xl mx-auto"
      initial="initial"
      animate="animate"
      variants={stagger}
    >
      <div className="go-back-container fixed bottom-8 right-4 md:static md:mb-8">
        <motion.div variants={fadeIn}>
          <GoBackButton text="Go Back" />
        </motion.div>
      </div>
      <motion.section
        className="flex justify-center items-center"
        variants={fadeIn}
      >
        <div className="w-full">
          <motion.div className="flex flex-row mt-4" variants={fadeIn}>
            <motion.h1
              className="hover:shadow-lg transition-shadow duration-200 font-semibold text-3xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {book.title}
            </motion.h1>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-6 gap-8 mt-8"
            variants={stagger}
          >
            <motion.div className="md:col-span-4 space-y-6" variants={stagger}>
              <motion.p variants={fadeIn}>{book.description}</motion.p>
              <motion.div variants={fadeIn}>
                <p className="text-gray-500 mr-4">Author</p>
                <p>{book.authorName}</p>
              </motion.div>
              <motion.div variants={fadeIn}>
                <p className="text-gray-500">Genre</p>
                <p>{book.genreName}</p>
              </motion.div>
            </motion.div>
            <motion.div className="md:col-span-1 space-y-6" variants={stagger}>
              <motion.div variants={fadeIn}>
                <p className="text-gray-500">Published Year</p>
                <p>{book.publishedYear}</p>
              </motion.div>
              <motion.div variants={fadeIn}>
                <p className="text-gray-500">Recommendations</p>
                <p>{book.numberOfRecommendations}</p>
              </motion.div>
              <motion.div variants={fadeIn}>
                <p className="text-gray-500">Rating</p>
                <p>{book.rating}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}
