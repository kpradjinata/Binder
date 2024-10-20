"use client";

import { api } from "@/convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import { useState } from "react";

import { useUser } from "@clerk/clerk-react";

import { Button } from "@/components/ui/button"


export default function Home() {
  const [task, setTask] = useState("");
  const createTask = useMutation(api.tasks.createTask);
  const tasks = useQuery(api.tasks.getTasks);
  const studentCourses = useQuery(api.courses.getStudentCourses);
  // const userId = useQuery(api.students.getCurrentStudentId);

  // const createHomework = useMutation(api.homeworks.createHomework);
  // const createQuiz = useMutation(api.quizzes.createQuiz);

  const { user } = useUser();

  // function createHomeworkHandler() {
  //   homework = fetch()

  //   createHomework({
  //     id: "1",
  //     courseId: "1",
  //   })
  // }

  // function createQuizHandler() {
  //   quiz = fetch()

  //   createHomework({
  //     id: "1",
  //     courseId: "1",
  //   })
  // }


  // function createDiscussionHandler() {

  // }

  const [courseTitle, setCourseTitle] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const createCourse = useMutation(api.courses.createCourse);


  function createCourseHandler(e: React.FormEvent) {
    e.preventDefault();
    createCourse({
      id: Math.random().toString(36).slice(2, 9), // Generate a random ID
      collegeId: "default_college_id", // You might want to make this dynamic
      subject: courseTitle,
      courseNumber: courseNumber,
      syllabus: "", // You can add this later if needed
    });
    setCourseTitle("");
    setCourseNumber("");
  }


  function homeworkHandler(e: React.FormEvent) {
    e.preventDefault();

    homework_questions = fetch()

    createHomework({
      id: "1",
      courseId: "1",
      name: "1",
      questions: homework_questions,
    })

    quiz = fetch()




  }




  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">


        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createTask({ text: task });
              setTask("");
            }}
          >
            <input type="text" onChange={(e) => setTask(e.target.value)} value={task} placeholder="New Task" className="border-2 border-gray-300 rounded-md p-2" />
            <Button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Add Task</Button>
            <Button>Click me</Button>
          </form>
        </div>
        <ul className="flex flex-col gap-4">
          {tasks?.map((task) => (
            <li key={task._id}>{task.text}</li>
          ))}
        </ul>
        <ul className="flex flex-col gap-4">
          {tasks?.map((task) => (
            <li key={task._id}>{task.text}</li>
          ))}
        </ul>

        <ul className="flex flex-col gap-4">
          {studentCourses?.map((course) => (
            <li key={course._id}>{course.courseId}{course.subject}</li>
          ))}
        </ul>
        {/* <span>Logged in as {user?.fullName}</span>; */}

        <form onSubmit={createCourseHandler} className="flex flex-col gap-4">
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Course Title"
            className="border-2 border-gray-300 rounded-md p-2"
          />
          <input
            type="text"
            value={courseNumber}
            onChange={(e) => setCourseNumber(e.target.value)}
            placeholder="Course Number"
            className="border-2 border-gray-300 rounded-md p-2"
          />
          <Button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
            Create Course
          </Button>
        </form>

      </main>
    </div>
  );
}
