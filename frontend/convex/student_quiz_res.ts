import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createStudentQuizResFirst = mutation({
    args: {
        questionIndex: v.number(),
        isCorrect: v.number(),
    },
    handler: async (ctx, args) => {
        const studentId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!studentId) {
            throw new ConvexError("Unauthorized");
        }

        const existingEntry = await ctx.db
            .query("studentQuizResFirst")
            .withIndex("by_studentId_questionIndex", (q) =>
                q.eq("studentId", studentId).eq("questionIndex", args.questionIndex)
            )
            .first();

        if (existingEntry) {
            return existingEntry;
        }

        const studentQuizResFirst = await ctx.db.insert("studentQuizResFirst", {
            studentId,
            questionIndex: args.questionIndex,
            isCorrect: args.isCorrect,
        });

        return studentQuizResFirst;
    }
});

export const createStudentQuizResSecond = mutation({
    args: {
        questionIndex: v.number(),
        isCorrect: v.number(),
    },
    handler: async (ctx, args) => {
        const studentId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!studentId) {
            throw new ConvexError("Unauthorized");
        }

        const existingEntry = await ctx.db
            .query("studentQuizResSecond")
            .withIndex("by_studentId_questionIndex", (q) =>
                q.eq("studentId", studentId).eq("questionIndex", args.questionIndex)
            )
            .first();

        if (existingEntry) {
            return existingEntry;
        }

        const studentQuizResSecond = await ctx.db.insert("studentQuizResSecond", {
            studentId,
            questionIndex: args.questionIndex,
            isCorrect: args.isCorrect,
        });

        return studentQuizResSecond;
    }
});

export const createStudentQuizResThird = mutation({
    args: {
        questionIndex: v.number(),
        isCorrect: v.number(),
    },
    handler: async (ctx, args) => {
        const studentId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!studentId) {
            throw new ConvexError("Unauthorized");
        }

        const existingEntry = await ctx.db
            .query("studentQuizResThird")
            .withIndex("by_studentId_questionIndex", (q) =>
                q.eq("studentId", studentId).eq("questionIndex", args.questionIndex)
            )
            .first();

        if (existingEntry) {
            return existingEntry;
        }

        const studentQuizResThird = await ctx.db.insert("studentQuizResThird", {
            studentId,
            questionIndex: args.questionIndex,
            isCorrect: args.isCorrect,
        });

        return studentQuizResThird;
    }
});


export const getAllStudentQuizResFirst = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("studentQuizResFirst").collect();
    }
});

export const getAllStudentQuizResSecond = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("studentQuizResFirst").collect();
    }
});

export const getAllStudentQuizResThird = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("studentQuizResFirst").collect();
    }
});

// export const createStudentQuizResFirstDummy = mutation({
//     args: {
//         studentId: v.string(),
//         questionIndex: v.number(),
//         isCorrect: v.number(),
//     },
//     handler: async (ctx, args) => {

//         const existingEntry = await ctx.db
//             .query("studentQuizResFirst")
//             .withIndex("by_studentId_questionIndex", (q) =>
//                 q.eq("studentId", args.studentId).eq("questionIndex", args.questionIndex)
//             )
//             .first();

//         if (existingEntry) {
//             return existingEntry;
//         }

//         const studentQuizResFirst = await ctx.db.insert("studentQuizResFirst", {
//             studentId: args.studentId,
//             questionIndex: args.questionIndex,
//             isCorrect: args.isCorrect,
//         });

//         return studentQuizResFirst;
//     }
// });

// export const createStudentQuizResSecondDummy = mutation({
//     args: {
//         studentId: v.string(),
//         questionIndex: v.number(),
//         isCorrect: v.number(),
//     },
//     handler: async (ctx, args) => {

//         const existingEntry = await ctx.db
//             .query("studentQuizResSecond")
//             .withIndex("by_studentId_questionIndex", (q) =>
//                 q.eq("studentId", args.studentId).eq("questionIndex", args.questionIndex)
//             )
//             .first();

//         if (existingEntry) {
//             return existingEntry;
//         }

//         const studentQuizResSecond = await ctx.db.insert("studentQuizResSecond", {
//             studentId: args.studentId,
//             questionIndex: args.questionIndex,
//             isCorrect: args.isCorrect,
//         });

//         return studentQuizResSecond;
//     }
// });

// export const createStudentQuizResThirdDummy = mutation({
//     args: {
//         studentId: v.string(),
//         questionIndex: v.number(),
//         isCorrect: v.number(),
//     },
//     handler: async (ctx, args) => {

//         const existingEntry = await ctx.db
//             .query("studentQuizResThird")
//             .withIndex("by_studentId_questionIndex", (q) =>
//                 q.eq("studentId", args.studentId).eq("questionIndex", args.questionIndex)
//             )
//             .first();

//         if (existingEntry) {
//             return existingEntry;
//         }

//         const studentQuizResThird = await ctx.db.insert("studentQuizResThird", {
//             studentId: args.studentId,
//             questionIndex: args.questionIndex,
//             isCorrect: args.isCorrect,
//         });

//         return studentQuizResThird;
//     }
// });
