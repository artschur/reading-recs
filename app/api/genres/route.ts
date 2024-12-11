import { genresTable } from "@/db/schema";
import { NextResponse } from "next/server";
import { db } from "@/db";

export async function GET(request: Request) {
    const query = db
        .select({
            id: genresTable.id,
            name: genresTable.name,
        })
        .from(genresTable)
    const response = await query;
    return NextResponse.json(response);
}

