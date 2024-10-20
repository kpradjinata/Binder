import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createQuiz = mutation({
    args: {
        id: v.string(),
        courseId: v.string(),
        name: v.string(),
        description: v.string(),
        questions: v.array(v.string()),
        answerOptions: v.array(v.array(v.string())),
        answers: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("quizzes", {
            id: args.id,
            courseId: args.courseId,
            name: args.name,
            description: args.description,
            questions: args.questions,
            answerOptions: args.answerOptions,
            answers: args.answers,
        });
    }
});

export const getQuizzes = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("quizzes").collect();
    }
});