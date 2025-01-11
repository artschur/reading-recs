import Image from "next/image";
import { Metadata } from "next";
import { Suspense } from "react";
import { getInfluentialPerson } from "@/app/_data/data";
import { cache } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// this is wont be duplicated
const getPersonData = cache(async (id: number) => {
  return await getInfluentialPerson(id);
});

async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params; //extrai a chave do params ja
    const person = await getPersonData(Number(id));
    return {
      title: `${person.name} | Influential People`,
      description: `Learn about ${person.name} and their book recommendations.`,
    };
  } catch {
    return {
      title: "Influential Person",
      description:
        "Learn about influential people and their book recommendations.",
    };
  }
}

function LoadingSkeleton() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="animate-pulse space-y-8">
        <div className="h-32 w-32 bg-gray-700 rounded-full mx-auto"></div>
        <div className="h-8 bg-gray-700 rounded w-48 mx-auto"></div>
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="h-4 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
}

async function PersonContent({ id }: { id: number }) {
  const person = await getPersonData(id);

  return (
    <div className="p-4 flex justify-center items-center text-white font-mono">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="relative w-40 h-40 mb-6 transform transition-all duration-300 hover:scale-105 hover:rotate-3">
              {person.profilePic && (
                <Image
                  src={person.profilePic}
                  layout="fill"
                  objectFit="cover"
                  alt={person.name}
                  className="rounded-full border-4 border-gray-600"
                />
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left">
              {person.name}
            </h1>
            <p className="text-xl text-gray-400 mb-4">{person.occupation}</p>
          </div>
          <div className="flex-1 space-y-6">
            <div className="bg-gray-700 p-6 rounded-lg shadow-inner">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-gray-300 leading-relaxed">
                {person.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-400 mb-1">Field</p>
                <p className="text-lg">{person.field}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-400 mb-1">Recommendations</p>
                <p className="text-lg">{person.recommendationsCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function InfluentialPeople({ params }: PageProps) {
  const { id } = await params;
  const person = getPersonData(Number(id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Suspense fallback={<LoadingSkeleton />}>
        <PersonContent id={Number(id)} />
      </Suspense>
    </div>
  );
}
