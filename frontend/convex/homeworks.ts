import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createHomework = mutation({
    args: {
        subject: v.string(),
        courseNumber: v.string(),
        name: v.string(),
        questions: v.array(v.string()),
        hints: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("homeworks", {
            subject: args.subject,
            courseNumber: args.courseNumber,
            name: args.name,
            questions: args.questions,
            hints: args.hints,
        })
    }
})

export const getHomework = query({
    args: {
        subject: v.string(),
        courseNumber: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("homeworks").withIndex("by_subject_number_name", (q) => q.eq("subject", args.subject).eq("courseNumber", args.courseNumber).eq("name", args.name)).collect();
    }
})