import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  RegisteredCourse,
  getRegisteredCourses,
  unregisterClass,
} from "../services/api";
import { AlertCircle, BookOpen } from "lucide-react";
import { toast } from "react-hot-toast";

interface RegisteredCoursesProps {
  periodId: string;
  semesterId: string;
}

export const RegisteredCourses = forwardRef<
  { fetchRegisteredCourses: () => Promise<void> },
  RegisteredCoursesProps
>(({ periodId, semesterId }, ref) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    totalCredits: number;
    courses: RegisteredCourse[];
  } | null>(null);
  const [unregisteringClass, setUnregisteringClass] = useState<string | null>(
    null
  );

  const fetchRegisteredCourses = async () => {
    try {
      setLoading(true);
      const result = await getRegisteredCourses(periodId, semesterId);
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Không thể tải danh s��ch môn học"
      );
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchRegisteredCourses,
  }));

  useEffect(() => {
    fetchRegisteredCourses();
  }, [periodId, semesterId]);

  const handleUnregister = async (course: RegisteredCourse) => {
    try {
      setUnregisteringClass(`${course.subjectCode}-${course.className}`);
      await unregisterClass(
        course.className,
        periodId,
        semesterId,
        course.subjectCode
      );
      toast.success(`Hủy đăng ký thành công lớp ${course.className}`);
      // Refresh the registered courses list
      await fetchRegisteredCourses();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi hủy đăng ký lớp học"
      );
    } finally {
      setUnregisteringClass(null);
    }
  };

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
      <div className="bg-indigo-50 p-4 rounded-lg flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium text-indigo-800">
            Tổng số tín chỉ đã đăng ký
          </h3>
          <p className="text-2xl font-bold text-indigo-600 mt-1">
            {data?.totalCredits || 0} tín chỉ
          </p>
        </div>
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
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
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
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleUnregister(course)}
                    disabled={
                      unregisteringClass ===
                      `${course.subjectCode}-${course.className}`
                    }
                    className={`text-red-600 hover:text-red-900 ${
                      unregisteringClass ===
                      `${course.subjectCode}-${course.className}`
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {unregisteringClass ===
                    `${course.subjectCode}-${course.className}` ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2" />
                        <span>Đang hủy...</span>
                      </div>
                    ) : (
                      "Hủy đăng ký"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
