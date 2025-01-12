"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PersonIcon } from "@radix-ui/react-icons";
import { IBM_Plex_Mono } from "next/font/google";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfluentialPerson } from "@/types";

const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: "600" });

interface InfluentialPeopleProps {
  people: InfluentialPerson[];
}

const MotionCard = motion(Card);

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

export function RecommendedInfluentialPeople({
  people,
}: InfluentialPeopleProps) {
  return (
    <section className="py-12 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="flex items-center mb-8" variants={cardVariants}>
          <PersonIcon className="w-6 h-6 text-primary mr-2" />
          <h2
            className={`${ibmPlexMono.className} text-3xl font-bold tracking-tight`}
          >
            Most Influential
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {people.map((person) => (
            <MotionCard
              key={person.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={`/influential/${person.id}`}
                className="flex flex-col h-full"
              >
                <CardHeader>
                  <div className="mb-4 relative w-36 h-36">
                    <Image
                      src={person.profilePic || "/default-profile-pic.jpg"}
                      alt={`Profile picture of ${person.name}`}
                      className="rounded-lg object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardTitle className="line-clamp-1">{person.name}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {person.occupation}
                  </p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm line-clamp-3">{person.description}</p>
                  <div className="mt-4">
                    <Badge variant="secondary">
                      {person.recommendationsCount} recommendations
                    </Badge>
                  </div>
                </CardContent>
              </Link>
            </MotionCard>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
