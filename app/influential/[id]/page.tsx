import Image from "next/image";
import { Metadata } from "next";
import { Suspense } from "react";
import { getInfluentialPerson } from "@/app/_data/data";
import { cache } from "react";
import GoBackButton from "@/components/ui/goBackButton";
import { StepBack } from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// this is wont be duplicated
const getPersonData = cache(async (id: number) => {
  return await getInfluentialPerson(id);
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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

export default async function InfluentialPeople({ params }: PageProps) {
  const { id } = await params;
  const person = getPersonData(Number(id));

  return (
    <div className="min-h-screen">
      <Suspense fallback={<LoadingSkeleton />}>
        <PersonContent id={Number(id)} />
      </Suspense>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="animate-pulse space-y-8">
        <div className="h-32 w-32 rounded-full mx-auto bg-gray-200 dark:bg-zinc-800"></div>
        <div className="h-8 rounded w-48 mx-auto bg-gray-200 dark:bg-zinc-800"></div>
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
}

async function PersonContent({ id }: { id: number }) {
  const person = await getPersonData(id);
  return (
    <div className="p-4 flex min-w-screen min-h-screen justify-center items-center font-mono">
      <div className="max-w-4xl rounded-lg bg-white dark:bg-zinc-950">
        <div className="go-back-container fixed bottom-8 right-4 md:static md:mb-8 md:ml-12 md:pt-12">
          <GoBackButton text="Go Back" />
        </div>
        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="relative w-40 h-40 mb-6 transform transition-all duration-300 hover:scale-105 hover:rotate-3">
              {person.profilePic && (
                <Image
                  src={person.profilePic}
                  layout="fill"
                  objectFit="cover"
                  alt={person.name}
                  className="rounded-full border-4 border-gray-200 dark:border-zinc-500"
                />
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left text-gray-900 dark:text-white">
              {person.name}
            </h1>
            <p className="text-xl text-gray-500 dark:text-zinc-400 mb-4">
              {person.occupation}
            </p>
          </div>
          <div className="flex-1 space-y-6">
            <div className="p-6">
              <h2 className="text-xl text-gray-500 dark:text-zinc-500 font-semibold mb-2">
                About
              </h2>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                {person.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg">
                <p className="text-gray-500 dark:text-zinc-500 mb-1">Field</p>
                <p className="text-lg text-gray-900 dark:text-white">
                  {person.field}
                </p>
              </div>
              <div className="p-4 rounded-lg">
                <p className="text-gray-500 dark:text-zinc-500 mb-1">
                  Recommendations
                </p>
                <p className="text-lg text-gray-900 dark:text-white">
                  {person.recommendationsCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
