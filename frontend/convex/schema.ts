import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    tasks: defineTable({
        text: v.string(),
        userId: v.string(),
    }).index('by_userId', ['userId']),
    colleges: defineTable({
        id: v.string(),
        name: v.string(),
    }).index('by_collegeId', ['id']),
    studentColleges: defineTable({
        studentId: v.string(),
        collegeId: v.string(),
    }).index('by_studentId', ['studentId'])
        .index('by_collegeId', ['collegeId']),
    courses: defineTable({
        id: v.string(),
        collegeId: v.string(),
        subject: v.string(),
        courseNumber: v.string(),
        syllabus: v.string(),
    }).index('by_college_subject_number', ['collegeId', 'subject', 'courseNumber']),
    studentCourses: defineTable({
        studentId: v.string(),
        courseId: v.string(),
        skills: v.array(v.string()),
    }).index('by_studentId', ['studentId'])
        .index('by_courseId', ['courseId']),
    studentSkills: defineTable({
        studentId: v.string(),
        courseId: v.string(),
        skill: v.array(v.string()),
    }).index('by_student_course', ['studentId', 'courseId']),
    quizzes: defineTable({
        id: v.string(),
        courseId: v.string(),
        name: v.string(),
        description: v.string(),
        questions: v.array(v.string()),
        answerOptions: v.array(v.array(v.string())),
        answers: v.array(v.string()),
    }).index('by_quizId', ['id']),
    groups: defineTable({
        id: v.string(),
        courseId: v.string(),
        name: v.string(),
        description: v.string(),
        students: v.array(v.string()),
    }).index('by_groupId', ['id']),
    homeworks: defineTable({
        id: v.string(),
        courseId: v.string(),
        name: v.string(),
        questions: v.array(v.string()),
        hints: v.array(v.string()),
    }).index('by_course_name', ['courseId', 'name']),
    discussions: defineTable({
        id: v.string(),
        courseId: v.string(),
        name: v.string(),
    }).index('by_courseId', ['courseId']),
    discussionPosts: defineTable({
        discussionId: v.string(),
        studentId: v.string(),
        content: v.string(),
    }).index('by_discussionId', ['discussionId']),
    meetings: defineTable({
        id: v.string(),
        groupId: v.string(),
        description: v.string(),
        students: v.array(v.string()),
        startDate: v.number(),
        endDate: v.number(),
        location: v.string(),
        zoomLink: v.string(),
    }).index('by_meetingId', ['id']),
    messages: defineTable({
        id: v.string(),
        groupId: v.string(),
        senderId: v.string(),
        content: v.string(),
        createdAt: v.number(),
    }).index('by_messageId', ['id']),
});
