import { db } from '@/db/index';
import { fieldsTable } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const query = db
        .select({
            id: fieldsTable.id,
            name: fieldsTable.name,
        })
        .from(fieldsTable)
    const response = await query;
    return NextResponse.json(response);
}