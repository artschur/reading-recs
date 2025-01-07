import { db } from "@/db/index";
import {
  influencialPeopleTable,
  recommendationsTable,
  fieldsTable,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request, props: any) {
  const id = await props.params.id;

  if (!id) {
    return new Response("Missing id parameter", { status: 400 });
  }
  try {
    const influential = await db
      .select({
        id: influencialPeopleTable.id,
        name: influencialPeopleTable.name,
        description: influencialPeopleTable.description,
        yearBorn: influencialPeopleTable.yearBorn,
        field: fieldsTable.name,
        occupation: influencialPeopleTable.occupation,
        profilePic: influencialPeopleTable.profilePic,
        recommendationsCount: sql<number>`COUNT(${recommendationsTable.id})`,
      })
      .from(influencialPeopleTable)
      .leftJoin(
        fieldsTable,
        eq(fieldsTable.id, influencialPeopleTable.influentialField_Id),
      )
      .leftJoin(
        recommendationsTable,
        eq(recommendationsTable.influencerId, influencialPeopleTable.id),
      )
      .where(eq(influencialPeopleTable.id, Number(id)))
      .groupBy(influencialPeopleTable.id, fieldsTable.name);

    return NextResponse.json(await influential);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
