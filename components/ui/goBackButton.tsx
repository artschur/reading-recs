"use client";
import { StepBack } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

interface GoBackButtonProps {
  text: string;
}

export default function GoBackButton({ text }: GoBackButtonProps) {
  const router = useRouter();

  return (
    <Button
      className="bg-zinc-950 border-2 border-zinc-900 hover:border-zinc-100 text-zinc-100 hover:text-zinc-950"
      onClick={() => router.back()}
    >
      <StepBack /> {text}
    </Button>
  );
}
