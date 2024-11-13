import React, { useState } from "react";
import { Grade, Semester } from "../../types";

export function Transcript() {
  const [activeView, setActiveView] = useState<"semester" | "total">(
    "semester"
  );
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(
    null
  );

  // Mock data bảng điểm
  const semesters: Semester[] = [
    {
      id: "1",
      name: "231",
      startDate: "2023-09-01",
      endDate: "2023-12-31",
      gpa: 3.75,
      grades: [
        {
          courseId: 1,
          courseName: "Introduction to Computer Science",
          courseCode: "CS101",
          credits: 3,
          grade: 4.0,
          semester: "231",
        },
        // Thêm mock data tiếp nếu cần
      ],
    },
    // Thêm mock data học kỳ
  ];

  const allGrades: Grade[] = semesters.flatMap((semester) => semester.grades);
  const totalGPA = calculateGPA(allGrades);

  function calculateGPA(grades: Grade[]): number {
    if (grades.length === 0) return 0;
    const totalPoints = grades.reduce(
      (sum, grade) => sum + grade.grade * grade.credits,
      0
    );
    const totalCredits = grades.reduce((sum, grade) => sum + grade.credits, 0);
    return totalPoints / totalCredits;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveView("semester")}
            className={`px-4 py-2 rounded-lg ${
              activeView === "semester"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Bảng điểm học kỳ
          </button>
          <button
            onClick={() => setActiveView("total")}
            className={`px-4 py-2 rounded-lg ${
              activeView === "total"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Bảng điểm tổng
          </button>
        </div>
      </div>

      {activeView === "semester" ? (
        selectedSemester ? (
          <SemesterDetail
            semester={selectedSemester}
            onBack={() => setSelectedSemester(null)}
          />
        ) : (
          <SemesterList semesters={semesters} onSelect={setSelectedSemester} />
        )
      ) : (
        <TotalTranscript grades={allGrades} gpa={totalGPA} />
      )}
    </div>
  );
}

interface SemesterListProps {
  semesters: Semester[];
  onSelect: (semester: Semester) => void;
}

function SemesterList({ semesters, onSelect }: SemesterListProps) {
  return (
    <div className="space-y-4">
      {semesters.map((semester) => (
        <div
          key={semester.id}
          onClick={() => onSelect(semester)}
          className="border rounded-lg p-4 cursor-pointer hover:border-indigo-500 transition-all"
        >
          <h3 className="text-lg font-medium">{semester.name}</h3>
          <p className="text-sm text-gray-500">
            GPA: {semester.gpa.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}

interface SemesterDetailProps {
  semester: Semester;
  onBack: () => void;
}

function SemesterDetail({ semester, onBack }: SemesterDetailProps) {
  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 text-indigo-600 hover:text-indigo-700 flex items-center"
      >
        ← Trở lại các bảng điểm học kỳ
      </button>
      <h2 className="text-xl font-semibold mb-4">{semester.name}</h2>
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-lg">GPA học kỳ: {semester.gpa.toFixed(2)}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã môn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên môn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số tín chỉ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Điểm
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {semester.grades.map((grade) => (
              <tr key={grade.courseId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {grade.courseCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {grade.courseName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {grade.credits}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {grade.grade.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface TotalTranscriptProps {
  grades: Grade[];
  gpa: number;
}

function TotalTranscript({ grades, gpa }: TotalTranscriptProps) {
  return (
    <div>
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-lg">GPA tổng: {gpa.toFixed(2)}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã môn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên môn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số tín chỉ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Điểm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Học kỳ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {grades.map((grade, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {grade.courseCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {grade.courseName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {grade.credits}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {grade.grade.toFixed(1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {grade.semester}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
