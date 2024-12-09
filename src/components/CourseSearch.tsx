import React, { useState } from "react";
import {
  Search,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  BookOpen,
  AlertCircle,
  Users,
} from "lucide-react";
import { Course } from "../types";
import {
  RegistrationPeriod,
  Subject,
  searchSubject,
  getClassDetails,
} from "../services/api";
import { toast } from "react-hot-toast";
import { RegisteredCourses } from "./RegisteredCourses";

interface CourseSearchProps {
  period: RegistrationPeriod;
  onBack: () => void;
  searchResults: any[] | null;
  onSearch: (results: any[] | null) => void;
}

export function CourseSearch({ period, onBack }: CourseSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Subject[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [classDetails, setClassDetails] = useState<ClassInfo[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      setLoading(true);
      const results = await searchSubject(searchQuery.trim(), period.id);
      setSearchResults(results);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi tìm kiếm môn học"
      );
      setSearchResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleExpandSubject = async (subjectCode: string) => {
    try {
      if (expandedSubject === subjectCode) {
        setExpandedSubject(null);
        setClassDetails([]);
        return;
      }

      setExpandedSubject(subjectCode);
      setLoadingClasses(true);
      const classes = await getClassDetails(
        period.id,
        period.description.replace("Học kỳ: ", ""),
        subjectCode
      );
      setClassDetails(classes);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi tải danh sách lớp học"
      );
      setExpandedSubject(null);
      setClassDetails([]);
    } finally {
      setLoadingClasses(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-sm rounded-lg p-4 mb-8">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {period.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Thời gian đợt đăng ký:{" "}
              <span className="text-indigo-600 font-medium">
                {new Date(period.startDate).toLocaleDateString()} -{" "}
                {new Date(period.endDate).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Nhập mã môn học để tìm kiếm (ví dụ: PH1003)..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm 
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 
              focus:border-indigo-500 transition-shadow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <BookOpen className="h-5 w-5 text-indigo-500 mr-2" />
          Môn học đã đăng ký
        </h3>
        <RegisteredCourses
          periodId={period.id}
          semesterId={period.description.replace("Học kỳ: ", "")}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : searchResults === null ? (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            Nhập mã môn học và nhấn Enter để tìm kiếm
          </p>
        </div>
      ) : searchResults.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Không tìm thấy môn học nào phù hợp</p>
        </div>
      ) : (
        <div className="space-y-4">
          {searchResults.map((subject) => (
            <div
              key={subject.code}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleExpandSubject(subject.code)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900">
                        {subject.code}
                      </h3>
                      <span className="mx-2 text-gray-300">•</span>
                      <h3 className="text-gray-700">{subject.nameVN}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 italic">
                      {subject.nameEN}
                    </p>
                    <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {subject.credits} tín chỉ
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400">
                    {expandedSubject === subject.code ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                </div>
              </div>

              {expandedSubject === subject.code && (
                <div className="border-t bg-gray-50 p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <Users className="h-4 w-4 text-gray-500 mr-2" />
                    Danh sách lớp học
                  </h4>
                  {loadingClasses ? (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                    </div>
                  ) : classDetails.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-2">
                      Không có lớp học nào
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {classDetails.map((classInfo) => (
                        <button
                          key={classInfo.className}
                          className="px-4 py-2 text-sm bg-white border rounded-lg hover:bg-gray-50 
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                            transition-colors shadow-sm hover:shadow"
                          onClick={() => {
                            console.log("Register for class:", classInfo);
                          }}
                        >
                          <span className="font-medium text-gray-900">
                            Lớp {classInfo.className}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
