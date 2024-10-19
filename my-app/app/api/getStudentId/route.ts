import { NextResponse } from 'next/server';
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET() {
    try {
        const result = await convex.query(api.students.getCurrentStudentId);
        return NextResponse.json({ userId: result });
    } catch (error) {
        console.error('Error fetching user ID:', error);
        return NextResponse.json({ error: 'Failed to fetch user ID' }, { status: 500 });
    }
}
