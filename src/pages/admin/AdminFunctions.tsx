import React, { useState } from "react";
import { Student } from "../../types";
import { Search, UserPlus, UserMinus, AlertCircle } from "lucide-react";

export function AdminFunctions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Mock data
  const students: Student[] = [
    {
      id: 1,
      username: "john.doe",
      role: "student",
      name: "John Doe",
      studentId: "CS2024001",
      major: "Computer Science",
      class: "CS2024A",
      status: "active",
    },
    {
      id: 2,
      username: "jane.smith",
      role: "student",
      name: "Jane Smith",
      studentId: "CS2024002",
      major: "Computer Science",
      class: "CS2024B",
      status: "active",
    },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (action: string) => {
    if (!selectedStudent) return;
    // Implement actual action logic here
    console.log(`Performing ${action} on student:`, selectedStudent);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Chức năng quản lý chung</h2>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Tìm kiếm sinh viên bằng tên hoặc ID..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium">Danh sách sinh viên</h3>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedStudent?.id === student.id
                      ? "bg-indigo-50 border-indigo-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium">{student.name}</div>
                  <div className="text-sm text-gray-500">
                    ID: {student.studentId} • Lớp: {student.class}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium">Hành động</h3>
          </div>
          <div className="p-4">
            {selectedStudent ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Sinh viên đang chọn</h4>
                  <p>Tên: {selectedStudent.name}</p>
                  <p>ID: {selectedStudent.studentId}</p>
                  <p>Lớp: {selectedStudent.class}</p>
                  <p>Trạng thái: {selectedStudent.status}</p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleAction("add-to-class")}
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Thêm vào lớp học
                  </button>
                  <button
                    onClick={() => handleAction("remove-from-class")}
                    className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <UserMinus className="h-4 w-4 mr-2" />
                    Xóa khỏi lớp học
                  </button>
                  <button
                    onClick={() => handleAction("change-status")}
                    className="w-full flex items-center justify-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Thay đổi trạng thái
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Chọn một sinh viên để thực hiện hành động
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
