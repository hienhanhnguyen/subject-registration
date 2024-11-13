import React, { useState } from "react";
import { Search, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Course, RegistrationPeriod } from "../types";

interface CourseSearchProps {
  period: RegistrationPeriod;
  onBack: () => void;
  searchResults: any[] | null;
  onSearch: (results: any[] | null) => void;
}

export function CourseSearch({ period, onBack }: CourseSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<Course[] | null>(null);

  // Mock data
  const courses: Course[] = [
    {
      id: 1,
      code: "CS101",
      name: "Introduction to Computer Science",
      instructor: "Nguyễn Giang Sơn",
      schedule: "Mon, Wed 10:00 AM - 11:30 AM",
      credits: 3,
      capacity: 30,
      enrolled: 25,
      description:
        "An introductory course covering the basic principles of computer science and programming.",
      prerequisites: ["None"],
      location: "Phòng 101, H6",
    },
    {
      id: 2,
      code: "CS201",
      name: "Data Structures",
      instructor: "Nguyễn Minh Anh",
      schedule: "Tue, Thu 2:00 PM - 3:30 PM",
      credits: 4,
      capacity: 25,
      enrolled: 20,
      description:
        "Advanced course covering various data structures and their implementations.",
      prerequisites: ["CS101"],
      location: "Phòng 205, H1",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    const results = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-xl font-semibold">{period.department}</h2>
          <p className="text-sm text-gray-500">
            Thời gian đợt đăng ký:{" "}
            {new Date(period.startDate).toLocaleDateString()} -{" "}
            {new Date(period.endDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Tìm kiếm môn học bằng tên hoặc mã môn ..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      {searchResults === null ? (
        <div className="text-center text-gray-500 py-8">
          Nhập từ khóa tìm kiếm và nhấn Enter để tìm môn học cần dăng ký
        </div>
      ) : searchResults.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          Không tìm thấy môn học nào phù hợp với tìm kiếm của bạn
        </div>
      ) : (
        <div className="space-y-4">
          {searchResults.map((course) => (
            <div
              key={course.id}
              className="border rounded-lg overflow-hidden bg-white transition-all duration-200"
            >
              <div
                onClick={() =>
                  setExpandedCourse(
                    expandedCourse === course.id ? null : course.id
                  )
                }
                className="p-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">
                      {course.code}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{course.name}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {course.schedule}
                  </div>
                </div>
                {expandedCourse === course.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>

              {expandedCourse === course.id && (
                <div className="p-4 bg-gray-50 border-t">
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Giảng viên
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {course.instructor}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Số tín chỉ
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {course.credits}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Địa điểm
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {course.location}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Số lượng
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {course.enrolled}/{course.capacity} đăng ký
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Mô tả
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {course.description}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Điều kiện tiên quyết
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {course.prerequisites.join(", ")}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-4">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                      Đăng ký môn học
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
