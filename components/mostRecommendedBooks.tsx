"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Book } from "@/types";

const MotionCard = motion.create(Card);

interface MostRecommendedBooksProps {
  books: Book[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function MostRecommendedBooks({
  books,
}: MostRecommendedBooksProps) {
  return (
    <section className="py-12 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="flex items-center mb-8" variants={cardVariants}>
          <ArrowUpRight className="w-6 h-6 text-primary mr-2" />
          <h2 className="text-3xl font-bold tracking-tight">
            Most Recommended
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <MotionCard
              key={book.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={`/books/${book.id}`} className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{book.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {book.authorName} • {book.publishedYear}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm">{book.description}</p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-sm font-medium">
                        {book.rating.toFixed(1)}
                      </span>
                    </div>
                    <Badge variant="secondary">
                      {book.numberOfRecommendations} recommendations
                    </Badge>
                  </div>
                </CardFooter>
              </Link>
            </MotionCard>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
