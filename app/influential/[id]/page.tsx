import { InfluentialPerson } from "@/app/recommended/page";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: {
    id: number;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const person = await getInfluentialPerson(params.id);
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

async function getInfluentialPerson(id: number): Promise<InfluentialPerson> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/influential_people/${id}`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default async function Page({ params }: PageProps) {
  try {
    const { id } = params;
    const person = await getInfluentialPerson(id);

    return (
      <div className="min-h-screen p-4 flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white font-mono">
        <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="relative w-40 h-40 mb-6 transform transition-all duration-300 hover:scale-105 hover:rotate-3">
                <Image
                  src={person.profilePic}
                  layout="fill"
                  objectFit="cover"
                  alt={person.name}
                  className="rounded-full border-4 border-gray-600"
                />
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
  } catch (error) {
    notFound();
  }
}
