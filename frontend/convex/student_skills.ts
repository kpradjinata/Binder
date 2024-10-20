import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";


// export const createStudentSkill = mutation({
//     args: {
//         studentId: v.string(),
//         courseId: v.string(),
//         skill: v.array(v.string()),
//     },
//     handler: async (ctx, args) => {
//         const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
//         if (!userId) {
//             throw new ConvexError("Unauthorized");
//         }
//         return await ctx.db.insert("studentSkills", {
//             studentId: userId,
//             courseId: args.courseId,
//             skill: args.skill,
//         })
//     }
// })

// export const getStudentSkill = query({
//     args: {
//         studentId: v.string(),
//         courseId: v.string(),
//     },
//     handler: async (ctx, args) => {
//         return await ctx.db.query("studentSkills").withIndex("by_student_course", (q) => q.eq("studentId", args.studentId).eq("courseId", args.courseId)).collect();
//     }
// })