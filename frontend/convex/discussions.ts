import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createDiscussion = mutation({
    args: {
        subject: v.string(),
        courseNumber: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("discussions", {
            subject: args.subject,
            courseNumber: args.courseNumber,
            name: args.name,
        })
    }
})

export const getAllDiscussions = query({
    args: {
        subject: v.string(),
        courseNumber: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("discussions").withIndex("by_subject_number_name", (q) => q.eq("subject", args.subject).eq("courseNumber", args.courseNumber).eq("name", args.name)).collect();
    }
})

export const createDiscussionPost = mutation({
    args: {
        subject: v.string(),
        courseNumber: v.string(),
        studentId: v.string(),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("discussionPosts", {
            subject: args.subject,
            courseNumber: args.courseNumber,
            studentId: args.studentId,
            content: args.content,
        })
    }
})

export const getDiscussionPosts = query({
    args: {
        subject: v.string(),
        courseNumber: v.string(),
        studentId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("discussionPosts").withIndex("by_subject_number_studentId", (q) => q.eq("subject", args.subject).eq("courseNumber", args.courseNumber).eq("studentId", args.studentId)).collect();
    }
})