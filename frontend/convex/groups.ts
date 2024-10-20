import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createGroup = mutation({
    args: {
        groupNumber: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("groups", {
            groupNumber: args.groupNumber,
        })
    }
})

export const getGroups = query({
    args: {
        groupNumber: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("groups").withIndex("by_groupNumber", (q) => q.eq("groupNumber", args.groupNumber)).collect();
    }
})

export const getGroupsByMemberName = query({
    args: { name: v.string() },
    handler: async (ctx, args) => {
        const memberGroups = await ctx.db
            .query('groupMembers')
            .filter((q) => q.eq(q.field('name'), args.name))
            .collect();

        const groupIds = memberGroups.map((member) => member.groupId);

        const groups = await Promise.all(
            groupIds.map(async (groupId) => {
                const group = await ctx.db.get(groupId);
                const members = await ctx.db
                    .query('groupMembers')
                    .filter((q) => q.eq(q.field('groupId'), groupId))
                    .collect();
                return { ...group, members };
            })
        );

        return groups;
    },
});


export const addMemberToGroup = mutation({
    args: {
        groupId: v.id('groups'),
        name: v.string(),
        skills: v.array(v.number())
    },
    handler: async (ctx, args) => {
        const memberId = await ctx.db.insert('groupMembers', {
            groupId: args.groupId,
            name: args.name,
            skills: args.skills
        });
        return memberId;
    },
});