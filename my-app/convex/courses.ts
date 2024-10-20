import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createCourse = mutation({
    args: {
        id: v.string(),
        collegeId: v.string(),
        subject: v.string(),
        courseNumber: v.string(),
        syllabus: v.string(),
    },
    handler: async (ctx, args) => {
        const existingCourse = await ctx.db
            .query("courses")
            .withIndex("by_college_subject_number", (q) =>
                q.eq("collegeId", args.collegeId)
                    .eq("subject", args.subject)
                    .eq("courseNumber", args.courseNumber)
            )
            .first();
        if (existingCourse) {
            throw new ConvexError("Course already exists");
        }
        return await ctx.db.insert("courses", {
            id: args.id,
            collegeId: args.collegeId,
            subject: args.subject,
            courseNumber: args.courseNumber,
            syllabus: args.syllabus,
        });
    }
});

export const getStudentCourses = query({
    handler: async (ctx) => {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            throw new ConvexError("Unauthorized");
        }
        return await ctx.db.query("studentCourses").withIndex("by_studentId", (q) => q.eq("studentId", userId)).collect();
    }
})


