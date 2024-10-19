import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createCourse = mutation({
    args: {
        id: v.string(),
        subject: v.string(),
        courseNumber: v.string(),
        syllabus: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("courses", {
            id: args.id,
            subject: args.subject,
            courseNumber: args.courseNumber,
            syllabus: args.syllabus,
        });
    }
});





