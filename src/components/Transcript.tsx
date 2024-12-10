import React, { useEffect, useState } from "react";
import {
  SemesterGrade,
  getSemesterGrades,
  ClassGrade,
  getClassGrades,
} from "../services/api";
import { AlertCircle, BookOpen } from "lucide-react";
import { toast } from "react-hot-toast";

export function Transcript() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [grades, setGrades] = useState<SemesterGrade[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [classGrades, setClassGrades] = useState<ClassGrade[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const gradesData = await getSemesterGrades();
        setGrades(gradesData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Không thể tải điểm học kỳ"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSemesterClick = async (semesterId: string) => {
    try {
      setSelectedSemester(semesterId);
      setLoadingClasses(true);
      const grades = await getClassGrades(semesterId);
      setClassGrades(grades);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Không thể tải điểm môn học"
      );
    } finally {
      setLoadingClasses(false);
    }
  };

  const renderClassGrades = () => {
    if (loadingClasses) {
      return (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
        </div>
      );
    }

    if (classGrades.length === 0) {
      return (
        <p className="text-center text-gray-500">Chưa có điểm môn học nào</p>
      );
    }

    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Mã môn
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Tên môn
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Lớp
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Bài tập
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                BTL
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                TN
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Giữa kỳ
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Cuối kỳ
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Tổng kết
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Hệ 4
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Điểm chữ
              </th>
            </tr>
          </thead>
          <tbody>
            {classGrades.map((grade: ClassGrade) => (
              <tr key={`${grade.subjectCode}-${grade.className}`}>
                <td className="px-4 py-2 text-sm">{grade.subjectCode}</td>
                <td className="px-4 py-2 text-sm">{grade.subjectName}</td>
                <td className="px-4 py-2 text-sm">{grade.className}</td>
                <td className="px-4 py-2 text-sm">
                  {grade.homeworkGrade.toFixed(1)}
                </td>
                <td className="px-4 py-2 text-sm">
                  {grade.projectGrade.toFixed(1)}
                </td>
                <td className="px-4 py-2 text-sm">
                  {grade.labGrade.toFixed(1)}
                </td>
                <td className="px-4 py-2 text-sm">
                  {grade.midtermGrade.toFixed(1)}
                </td>
                <td className="px-4 py-2 text-sm">
                  {grade.finalGrade.toFixed(1)}
                </td>
                <td className="px-4 py-2 text-sm">
                  {grade.totalGrade10.toFixed(1)}
                </td>
                <td className="px-4 py-2 text-sm">
                  {grade.totalGrade4.toFixed(1)}
                </td>
                <td className="px-4 py-2 text-sm font-medium">
                  {grade.letterGrade}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6">
      {grades.map((grade) => (
        <React.Fragment key={grade.semesterId}>
          <tr
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => handleSemesterClick(grade.semesterId)}
          >
            {/* ... semester row content ... */}
          </tr>
          {selectedSemester === grade.semesterId && (
            <tr>
              <td colSpan={4} className="px-6 py-4">
                {renderClassGrades()}
              </td>
            </tr>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
