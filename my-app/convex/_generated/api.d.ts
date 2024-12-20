/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as courses from "../courses.js";
import type * as discussions from "../discussions.js";
import type * as homeworks from "../homeworks.js";
import type * as quizzes from "../quizzes.js";
import type * as student_skills from "../student_skills.js";
import type * as students from "../students.js";
import type * as tasks from "../tasks.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  courses: typeof courses;
  discussions: typeof discussions;
  homeworks: typeof homeworks;
  quizzes: typeof quizzes;
  student_skills: typeof student_skills;
  students: typeof students;
  tasks: typeof tasks;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
