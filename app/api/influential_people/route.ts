import { db } from "@/db/index";
import {
  fieldsTable,
  influencialPeopleTable,
  recommendationsTable,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const query = db
    .select({
      id: influencialPeopleTable.id,
      name: influencialPeopleTable.name,
      description: influencialPeopleTable.description,
      yearBorn: influencialPeopleTable.yearBorn,
      field: fieldsTable.name,
      occupation: influencialPeopleTable.occupation,
      profilePic: influencialPeopleTable.profilePic,
      visible: influencialPeopleTable.visible,
      recommendationsCount: sql<number>`COUNT(${recommendationsTable.id})`,
    })
    .from(influencialPeopleTable)
    .leftJoin(
      recommendationsTable,
      eq(recommendationsTable.influencerId, influencialPeopleTable.id),
    )
    .leftJoin(
      fieldsTable,
      eq(fieldsTable.id, influencialPeopleTable.influentialField_Id),
    )
    .groupBy(influencialPeopleTable.id, fieldsTable.name);

  const response = await query;

  return NextResponse.json(response);
}
