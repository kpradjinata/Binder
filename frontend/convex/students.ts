import { ConvexError } from 'convex/values';
import { query } from './_generated/server';

export const getCurrentStudentId = query({
    args: {},
    handler: async (ctx) => {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        console.log(userId);

        if (!userId) {
            throw new ConvexError("Unauthorized");
        }

        return userId;
    },
});