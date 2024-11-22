import React from "react";
import { FlipWords } from "./ui/flip-words";

export function FlipWordsDemo() {
    const words = ["better", "fun", "new", "out of the box"];

    return (
        <div className="text-4xl mx-auto font-normal text-neutral-700 dark:text-neutral-400">
            read <span className="text-green-600 dark:text-green-300 font-bold"> <FlipWords words={words} /> </span> <br /> books with readingrecs.
        </div>
    );
}
