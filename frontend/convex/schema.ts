import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    tasks: defineTable({
        text: v.string(),
        userId: v.string(),
    }).index('by_userId', ['userId']),
    courses: defineTable({
        subject: v.string(),
        courseNumber: v.string(),
        syllabus: v.string(),
    }).index('by_subject_number', ['subject', 'courseNumber']),
    studentCourses: defineTable({
        studentId: v.string(),
        subject: v.string(),
        courseNumber: v.string(),
        skills: v.array(v.string()),
    }).index('by_studentId', ['studentId'])
        .index('by_subject_number', ['subject', 'courseNumber']),
    studentSkills: defineTable({
        studentId: v.string(),
        subject: v.string(),
        courseNumber: v.string(),
        skill: v.array(v.string()),
    }).index('by_student_subject_number', ['studentId', 'subject', 'courseNumber']),
    quizzes: defineTable({
        subject: v.string(),
        courseNumber: v.string(),
        name: v.string(),
        questions: v.array(v.string()),
        answerOptions: v.array(v.array(v.string())),
        answers: v.array(v.string()),
    }).index('by_subject_number', ['subject', 'courseNumber']),
    groups: defineTable({
        subject: v.string(),
        courseNumber: v.string(),
        name: v.string(),
        students: v.array(v.string()),
    }).index('by_subject_number', ['subject', 'courseNumber']),
    homeworks: defineTable({
        subject: v.string(),
        courseNumber: v.string(),
        name: v.string(),
        questions: v.array(v.string()),
        hints: v.array(v.string()),
    }).index('by_subject_number_name', ['subject', 'courseNumber', 'name']),
    discussions: defineTable({
        subject: v.string(),
        courseNumber: v.string(),
        name: v.string(),
    }).index('by_subject_number_name', ['subject', 'courseNumber', 'name']),
    discussionPosts: defineTable({
        subject: v.string(),
        courseNumber: v.string(),
        studentId: v.string(),
        content: v.string(),
    }).index('by_subject_number_studentId', ['subject', 'courseNumber', 'studentId']),
    meetings: defineTable({
        subject: v.string(),
        courseNumber: v.string(),
        groupId: v.string(),
        description: v.string(),
        students: v.array(v.string()),
        startDate: v.number(),
        endDate: v.number(),
        location: v.string(),
        zoomLink: v.string(),
    }).index('by_subject_number_groupId', ['subject', 'courseNumber', 'groupId']),
    messages: defineTable({
        subject: v.string(),
        courseNumber: v.string(),
        groupId: v.string(),
        senderId: v.string(),
        content: v.string(),
        createdAt: v.number(),
    }).index('by_subject_number_groupId', ['subject', 'courseNumber', 'groupId']),
    studentQuizResFirst: defineTable({
        studentId: v.string(),
        questionIndex: v.number(),
        isCorrect: v.number(),
    }).index('by_studentId_questionIndex', ['studentId', 'questionIndex']),
    studentQuizResSecond: defineTable({
        studentId: v.string(),
        questionIndex: v.number(),
        isCorrect: v.number(),
    }).index('by_studentId_questionIndex', ['studentId', 'questionIndex']),
    studentQuizResThird: defineTable({
        studentId: v.string(),
        questionIndex: v.number(),
        isCorrect: v.number(),
    }).index('by_studentId_questionIndex', ['studentId', 'questionIndex']),
});
