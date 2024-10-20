import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createDiscussion = mutation({
    args: {
        id: v.string(),
        courseId: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("discussions", {
            id: args.id,
            courseId: args.courseId,
            name: args.name,
        })
    }
})

export const getAllDiscussions = query({
    args: {
        courseId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("discussions").withIndex("by_courseId", (q) => q.eq("courseId", args.courseId)).collect();
    }
})

export const createDiscussionPost = mutation({
    args: {
        discussionId: v.string(),
        studentId: v.string(),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("discussionPosts", {
            discussionId: args.discussionId,
            studentId: args.studentId,
            content: args.content,
        })
    }
})

export const getDiscussionPosts = query({
    args: {
        discussionId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("discussionPosts").withIndex("by_discussionId", (q) => q.eq("discussionId", args.discussionId)).collect();
    }
})