import React, { useEffect, useState } from "react";
import { RegisteredCourse, getRegisteredCourses } from "../services/api";
import { AlertCircle, BookOpen } from "lucide-react";

interface RegisteredCoursesProps {
  periodId: string;
  semesterId: string;
}

export function RegisteredCourses({
  periodId,
  semesterId,
}: RegisteredCoursesProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    totalCredits: number;
    courses: RegisteredCourse[];
  } | null>(null);

  useEffect(() => {
    const fetchRegisteredCourses = async () => {
      try {
        setLoading(true);
        const result = await getRegisteredCourses(periodId, semesterId);
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Không thể tải danh sách môn học"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredCourses();
  }, [periodId, semesterId]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!data || data.courses.length === 0) {
    return (
      <div className="text-center py-8">
        <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">Chưa có môn học nào được đăng ký</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-indigo-50 p-4 rounded-lg">
        <p className="text-indigo-700 font-medium">
          Tổng số tín chỉ đã đăng ký: {data.totalCredits}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã môn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên môn học
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lớp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sĩ số
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Học kỳ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.courses.map((course) => (
              <tr key={`${course.subjectCode}-${course.className}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {course.subjectCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.subjectName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.className}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.currentSize}/{course.maxSize}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.semester}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
