import { NextResponse } from 'next/server';
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
    try {
        const quizData = await request.json();

        // Store the quiz data in Convex
        const result = await convex.mutation(api.quizzes.createQuiz, {
            topicName: "Generated Quiz",
            difficulty: "medium",
            questions: quizData
        });

        return NextResponse.json({ message: "Quiz stored successfully", quizId: result });
    } catch (error) {
        return NextResponse.json({ message: "Error storing quiz", error }, { status: 500 });
    }
}