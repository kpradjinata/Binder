import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createQuiz = mutation({
    args: {
        subject: v.string(),
        courseNumber: v.string(),
        name: v.string(),
        questions: v.array(v.string()),
        answerOptions: v.array(v.array(v.string())),
        answers: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("quizzes", {
            subject: args.subject,
            courseNumber: args.courseNumber,
            name: args.name,
            questions: args.questions,
            answerOptions: args.answerOptions,
            answers: args.answers,
        });
    }
});

export const getMostRecentQuiz = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("quizzes").order("desc").first();
    }
});