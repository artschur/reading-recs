import { db } from '@/db/index';
import { influencialPeopleTable, recommendationsTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { desc, asc } from 'drizzle-orm';
import { AArrowUp } from 'lucide-react';

export async function GET(request: Request) {
    const query = db
        .select({
            id: influencialPeopleTable.id,
            name: influencialPeopleTable.name,
            description: influencialPeopleTable.description,
            yearBorn: influencialPeopleTable.yearBorn,
            influentialField_Id: influencialPeopleTable.influentialField_Id,
            occupation: influencialPeopleTable.occupation,
            profilePic: influencialPeopleTable.profilePic,
            visible: influencialPeopleTable.visible,
            recommendationsCount: sql<number>`COUNT(${recommendationsTable.id})`
        })
        .from(influencialPeopleTable)
        .leftJoin(
            recommendationsTable,
            eq(recommendationsTable.influencerId,
                influencialPeopleTable.id))
        .groupBy(influencialPeopleTable.id);

    const response = await query;

    return NextResponse.json(response);
}