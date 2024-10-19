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
  const userId = useQuery(api.students.getCurrentStudentId);

  const createHomework = useMutation(api.homeworks.createHomework);
  const createQuiz = useMutation(api.quizzes.createQuiz);

  const { user } = useUser();

  function createHomeworkHandler() {
    homework = fetch()

    createHomework({
      id: "1",
      courseId: "1",
    })
  }

  function createQuizHandler() {
    quiz = fetch()

    createHomework({
      id: "1",
      courseId: "1",
    })
  }


  function createDiscussionHandler() {

  }

  function createCourseHandler() {

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
          {userId}
        </ul>
        <span>Logged in as {user?.fullName}</span>;

      </main>
    </div>
  );
}
