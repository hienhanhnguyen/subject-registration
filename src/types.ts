export interface User {
  id: number;
  username: string;
  role: 'student' | 'admin';
  name: string;
}

export interface Student extends User {
  studentId: string;
  major: string;
  class: string;
  status: 'active' | 'inactive';
}

export interface Admin extends User {
  department: string;
}

export interface Course {
  id: number;
  code: string;
  name: string;
  instructor: string;
  schedule: string;
  credits: number;
  capacity: number;
  enrolled: number;
  description: string;
  prerequisites: string[];
  location: string;
}

export interface Grade {
  courseId: number;
  courseName: string;
  courseCode: string;
  credits: number;
  grade: number;
  semester: string;
}

export interface Semester {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  gpa: number;
  grades: Grade[];
}