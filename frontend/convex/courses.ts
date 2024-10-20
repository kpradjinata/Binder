import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createCourse = mutation({
    args: {
        subject: v.string(),
        courseNumber: v.string(),
        syllabus: v.string(),
    },
    handler: async (ctx, args) => {
        const existingCourse = await ctx.db
            .query("courses")
            .withIndex("by_subject_number", (q) =>
                q.eq("subject", args.subject)
                    .eq("courseNumber", args.courseNumber)
            )
            .first();
        if (existingCourse) {
            throw new ConvexError("Course already exists");
        }
        return await ctx.db.insert("courses", {
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


export const createOrJoinCourse = mutation({
    args: {
        subject: v.string(),
        courseNumber: v.string(),
        syllabus: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { subject, courseNumber, syllabus } = args;

        const studentId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!studentId) {
            throw new ConvexError("Unauthorized");
        }

        // Check if the course already exists
        const existingCourse = await ctx.db
            .query("courses")
            .withIndex("by_subject_number", (q) =>
                q
                    .eq("subject", subject)
                    .eq("courseNumber", courseNumber)
            )
            .first();

        let courseId: string;

        if (!existingCourse) {
            // Create a new course if it doesn't exist
            const newCourse = await ctx.db.insert("courses", {
                subject,
                courseNumber,
                syllabus: syllabus || "",
            });
            courseId = newCourse;
        } else {
            courseId = existingCourse._id;
        }

        // Check if the student is already enrolled in the course
        const existingEnrollment = await ctx.db
            .query("studentCourses")
            .withIndex("by_studentId", (q) => q.eq("studentId", studentId))
            .filter((q) =>
                q.eq(q.field("subject"), subject) &&
                q.eq(q.field("courseNumber"), courseNumber)
            )
            .first();

        if (!existingEnrollment) {
            // Add the student to the course if not already enrolled
            await ctx.db.insert("studentCourses", {
                studentId,
                subject,
                courseNumber,
                skills: [], // Initialize with an empty array of skills
            });
        }

        return { courseId, message: "Course created or joined successfully" };
    },
});
