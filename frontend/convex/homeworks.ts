import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createHomework = mutation({
    args: {
        id: v.string(),
        courseId: v.string(),
        name: v.string(),
        questions: v.array(v.string()),
        hints: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("homeworks", {
            id: args.id,
            courseId: args.courseId,
            name: args.name,
            questions: args.questions,
            hints: args.hints,
        })
    }
})

export const getHomework = query({
    args: {
        courseId: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("homeworks").withIndex("by_course_name", (q) => q.eq("courseId", args.courseId).eq("name", args.name)).collect();
    }
})