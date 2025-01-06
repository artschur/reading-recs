import { PersonIcon } from "@radix-ui/react-icons";
import { IBM_Plex_Mono } from "next/font/google";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import Image from "next/image"; // Importing the Next.js Image component

interface InfluentialPerson {
  id: number;
  name: string;
  description: string;
  yearBorn: number;
  influentialField_Id: number;
  occupation: string;
  profilePic: string;
  visible: boolean;
  recommendationsCount: number;
}

interface InfluentialPeopleProps {
  person: InfluentialPerson[];
}

const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: "600" });

export function RecommendedInfluentialPeople({
  person,
}: InfluentialPeopleProps) {
  return (
    <>
      <div className="p-4 mt-4 ml-2 flex flex-row items-center ">
        <PersonIcon />
        <h1 className={`${ibmPlexMono.className} text-xl ml-2`}>
          Most Influential
        </h1>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {person.map((p) => (
          <Card key={p.id}>
            <Link href={`/influential/${p.id}`} className="flex flex-col">
              <CardHeader>
                <div className="mb-4">
                  <Image
                    src={p.profilePic}
                    alt={`Profile picture of ${p.name}`}
                    className="rounded-lg object-cover max-w-36 max-h-36"
                    width={140} // Set a fixed width for the image
                    height={140}
                  />
                </div>
                <CardTitle>{p.name}</CardTitle>
                <p className="text-green-700">{p.occupation}</p>
                <p className="mt-4">
                  {p.recommendationsCount} recommendations made.
                </p>
              </CardHeader>
              <CardContent>
                <p>{p.description}</p>
              </CardContent>
              <CardFooter></CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
}
