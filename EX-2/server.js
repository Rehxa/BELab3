/** @format */

// server.js

import logger from "./logger.js";
import authenticate from "./auth.js";
import validateQuery from "./validateQuery.js";

import express from "express";
import courses from "./course.js";
const app = express();
const PORT = 3000;

app.use(logger);
app.use(authenticate);
app.use(validateQuery);

// Route: GET /departments/:dept/courses
app.get("/departments/:dept/courses", (req, res) => {
  const { dept } = req.params;
  const { level, minCredits, maxCredits, semester, instructor } = req.query;
  // Implementing the filter logic
  // Hint: Use the filter method to filter the courses array based on the provided criteria
  let filteredCourses = courses.filter((course) => course.department === dept);
  if (level) {
    filteredCourses = filteredCourses.filter(
      (course) => course.level === level
    );
  }
  if (minCredits) {
    filteredCourses = filteredCourses.filter(
      (course) => course.credits >= parseInt(minCredits)
    );
  }
  if (maxCredits) {
    filteredCourses = filteredCourses.filter(
      (course) => course.credits <= parseInt(maxCredits)
    );
  }
  if (semester) {
    filteredCourses = filteredCourses.filter(
      (course) => course.semester === semester
    );
  }
  if (instructor) {
    const search = instructor.toLowerCase();
    filteredCourses = filteredCourses.filter((course) =>
      course.instructor.toLowerCase().includes(search)
    );
  }

  res.status(200).json({
    results: filteredCourses,
    meta: {
      total: filteredCourses.length,
    },
  });
});

app.use((req, res, next) => {
  return res.status(404).send("404 Not Found");
});

app.listen(PORT, () => {
  //EX2-test filtering and fetching course records
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`http://localhost:3000/departments/CSE/courses`);
  console.log(
    `http://localhost:3000/departments/CSE/courses?level=undergraduate`
  );
  console.log(`http://localhost:3000/departments/CSE/courses?minCredits=4`);
  console.log(
    `http://localhost:3000/departments/CSE/courses?instructor=smith&semester=fall`
  );
  //EX3
  // test validation
  console.log(`test validation`);
  console.log(`http://localhost:3000/departments/CSE/courses?minCredits=abc`);
  console.log(
    `http://localhost:3000/departments/CSE/courses?minCredits=4&maxCredits=2`
  );
  // test token
  console.log(`test token`);
  console.log(`http://localhost:3000/departments/CSE/courses`);
  console.log(`http://localhost:3000/departments/CSE/courses?token=abc`);
  console.log(`http://localhost:3000/departments/CSE/courses?token=xyz123`);
  console.log(
    `http://localhost:3000/departments/CSE/courses?level=undergraduate&minCredits=3&token=xyz123`
  );
});
