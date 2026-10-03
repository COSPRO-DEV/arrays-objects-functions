// ===== Question 1: Create Student Objects =====

const students = [
  { id: 1, name: "Tochukwu Nwodo", age: 21, grades: [85, 90, 78] },
  { id: 2, name: "Chidinma Eze", age: 20, grades: [95, 92, 98] },
  { id: 3, name: "Bola Adewale", age: 22, grades: [60, 65, 58] },
  { id: 4, name: "Ifeanyi Okafor", age: 19, grades: [45, 50, 40] },
  { id: 5, name: "Grace Umeh", age: 21, grades: [72, 75, 70] }
];

console.log("Students:", students);

// ===== Question 2: Calculate Averages =====

// calculateAverage takes an array of grades and returns their average,
// rounded to 2 decimal places. reduce() is used to sum the grades down
// to a single total before dividing.
function calculateAverage(grades) {
  const total = grades.reduce((sum, grade) => sum + grade, 0);
  const average = total / grades.length;
  return Number(average.toFixed(2));
}

// map() runs over every student and returns a NEW array, where each
// student is a copy of the original plus a new "average" property.
// The spread operator (...student) copies all existing properties first,
// so the original students array is never modified.
const studentsWithAverage = students.map(student => {
  return { ...student, average: calculateAverage(student.grades) };
});

console.log("Students with Average:", studentsWithAverage);

// ===== Question 3: Filter Passing Students =====

// filter() tests every student with a true/false condition. Only students
// where the condition is true make it into the returned array — the rest
// are left out entirely. Unlike map(), the output array can be a
// different length than the input.
function getPassingStudents(students) {
  return students.filter(student => student.average >= 60);
}

const passingStudents = getPassingStudents(studentsWithAverage);
console.log("Passing Students:", passingStudents);

// ===== Question 4: Functions & Callbacks =====

// processStudents takes a students array AND a function (callback).
// It applies that callback to every student and returns the resulting
// array. It has no idea what the callback actually does — that's the
// whole point of a callback, the behavior is decided by whoever calls it.
function processStudents(students, callback) {
  return students.map(student => callback(student));
}

// addLetterGrade is one possible callback: adds a letterGrade property
// based on the student's average. Uses the spread operator so the
// original student object is never mutated.
function addLetterGrade(student) {
  let letterGrade;
  if (student.average >= 90) {
    letterGrade = "A";
  } else if (student.average >= 80) {
    letterGrade = "B";
  } else if (student.average >= 70) {
    letterGrade = "C";
  } else if (student.average >= 60) {
    letterGrade = "D";
  } else {
    letterGrade = "F";
  }
  return { ...student, letterGrade };
}

// addStatus is a second, completely different callback: adds a status
// of "Pass" or "Fail" based on the same average property.
function addStatus(student) {
  const status = student.average >= 60 ? "Pass" : "Fail";
  return { ...student, status };
}

const studentsWithGrades = processStudents(studentsWithAverage, addLetterGrade);
console.log("Students with Letter Grades:", studentsWithGrades);

const studentsWithStatus = processStudents(studentsWithAverage, addStatus);
console.log("Students with Status:", studentsWithStatus);