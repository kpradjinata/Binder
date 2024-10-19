import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// Create a task with the given text
export const createTask = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
        // check if user is authenticated
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        console.log(userId);

        if (!userId) {
            throw new ConvexError("Unauthorized");
        }

        const newTaskId = await ctx.db.insert("tasks", {
            text: args.text,
            userId: userId
        });
        return newTaskId;
    }
})

// Get all tasks
export const getTasks = query({

    handler: async (ctx) => {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        console.log(userId);

        if (!userId) {
            return [];
        }

        return await ctx.db.query("tasks")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .collect();
    }
})

