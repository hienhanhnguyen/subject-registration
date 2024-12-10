import React, { useState, useEffect } from "react";
import { SemesterGrade, getSemesterGrades } from "../../services/api";
import { AlertCircle, BookOpen } from "lucide-react";
import { ClassGrade, getClassGrades } from "../../services/api";
import { toast } from "react-hot-toast";
import { getGPAAndCredits } from "../../services/api";
import { GPAAndCredits } from "../../services/api";
import { getTranscript, TranscriptGrade } from "../../services/api";

export function Transcript() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [grades, setGrades] = useState<SemesterGrade[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [classGrades, setClassGrades] = useState<ClassGrade[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [overallGPA, setOverallGPA] = useState<GPAAndCredits | null>(null);
  const [transcriptGrades, setTranscriptGrades] = useState<TranscriptGrade[]>(
    []
  );
  const [activeView, setActiveView] = useState<"semester" | "transcript">(
    "semester"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [gradesData, gpaData, transcriptData] = await Promise.all([
          getSemesterGrades(),
          getGPAAndCredits(),
          getTranscript(),
        ]);
        setGrades(gradesData);
        setOverallGPA(gpaData);
        setTranscriptGrades(transcriptData);
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

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (grades.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500">Chưa có điểm học kỳ nào</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Điểm tổng kết
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-sm text-indigo-600 font-medium">GPA (Hệ 10)</p>
            <p className="text-2xl font-bold text-indigo-700">
              {overallGPA?.gpa10.toFixed(2) || "0.00"}
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-sm text-indigo-600 font-medium">GPA (Hệ 4)</p>
            <p className="text-2xl font-bold text-indigo-700">
              {overallGPA?.gpa4.toFixed(2) || "0.00"}
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-sm text-indigo-600 font-medium">
              Tổng số tín chỉ
            </p>
            <p className="text-2xl font-bold text-indigo-700">
              {overallGPA?.totalCredits || 0}
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-sm text-indigo-600 font-medium">Ngày cập nhật</p>
            <p className="text-2xl font-bold text-indigo-700">
              {overallGPA
                ? new Date(
                    overallGPA.expectedGraduationDate
                  ).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setActiveView("semester")}
          className={`px-4 py-2 rounded-lg ${
            activeView === "semester"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Điểm theo học kỳ
        </button>
        <button
          onClick={() => setActiveView("transcript")}
          className={`px-4 py-2 rounded-lg ${
            activeView === "transcript"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Bảng điểm tổng
        </button>
      </div>

      {activeView === "semester" ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Học kỳ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GPA (Hệ 10)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GPA (Hệ 4)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số tín chỉ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grades.map((grade) => (
                <React.Fragment key={grade.semesterId}>
                  <tr
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSemesterClick(grade.semesterId)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {grade.semesterId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {grade.gpa10.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {grade.gpa4.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {grade.credits}
                    </td>
                  </tr>
                  {selectedSemester === grade.semesterId && (
                    <tr>
                      <td colSpan={4} className="px-6 py-4">
                        {loadingClasses ? (
                          <div className="flex justify-center py-4">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                          </div>
                        ) : classGrades.length === 0 ? (
                          <p className="text-center text-gray-500">
                            Chưa có điểm môn học nào
                          </p>
                        ) : (
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
                                    Điểm bài tập
                                  </th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                    Điểm BTL
                                  </th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                    Điểm TN
                                  </th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                    Điểm GK
                                  </th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                    Điểm CK
                                  </th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                    Tổng kết hệ 10
                                  </th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                    Tổng kết hệ 10
                                  </th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                    Tổng kết hệ 4
                                  </th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                    Điểm chữ
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {classGrades.map((classGrade) => (
                                  <tr
                                    key={`${classGrade.subjectCode}-${classGrade.className}`}
                                  >
                                    <td className="px-4 py-2 text-sm">
                                      {classGrade.subjectCode}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                      <div>{classGrade.subjectName}</div>
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                      {classGrade.className}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                      {classGrade.homeworkGrade.toFixed(1)}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                      {classGrade.projectGrade.toFixed(1)}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                      {classGrade.labGrade.toFixed(1)}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                      {classGrade.midtermGrade.toFixed(1)}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                      {classGrade.finalGrade.toFixed(1)}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                      {classGrade.totalGrade10.toFixed(1)}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                      {classGrade.totalGrade4.toFixed(1)}
                                    </td>
                                    <td className="px-4 py-2 text-sm font-medium">
                                      {classGrade.letterGrade}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                  Ngày cập nhật
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đi���m hệ 10
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điểm hệ 4
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điểm chữ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transcriptGrades.map((grade) => (
                <tr key={`${grade.subjectCode}-${grade.date.getTime()}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {grade.subjectCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {grade.subjectName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {grade.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {grade.grade10.toFixed(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {grade.grade4.toFixed(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {grade.letterGrade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
