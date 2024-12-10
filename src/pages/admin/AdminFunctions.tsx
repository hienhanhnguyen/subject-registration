import React, { useState } from "react";
import { Search, AlertCircle } from "lucide-react";
import {
  StudentSearchResult,
  searchStudents,
  updateStudent,
  UpdateStudentDTO,
} from "../../services/api";
import { toast } from "react-hot-toast";

export function AdminFunctions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<StudentSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<StudentSearchResult | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UpdateStudentDTO | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const params = /^\d+$/.test(searchQuery)
        ? { studentId: searchQuery }
        : { faculty: searchQuery };

      const results = await searchStudents(params);
      setSearchResults(results);

      if (results.length === 0) {
        toast.error("Không tìm thấy sinh viên nào");
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi tìm kiếm sinh viên"
      );
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student: StudentSearchResult) => {
    setEditForm({
      ma_nguoi_dung: student.id,
      ma_gvcn: 10009, // Default value, you might want to make this dynamic
      ma_he_dao_tao: student.program,
      ma_khoa_sv: student.class,
      ma_chuan_av: 5, // Default value
      ma_chuan_sv: 5, // Default value
      ma_ctdt: `${student.faculty.split(" ")[1]}_${student.program}_${
        student.class
      }`,
      ngay_ctxh: 15, // Default value
      email: student.email,
      gioi_tinh: student.gender,
      dia_chi: student.address,
      sdt: student.phone,
      cccd: student.idNumber,
    });
    setIsEditing(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    try {
      setLoading(true);
      await updateStudent(editForm);
      toast.success("Cập nhật thông tin sinh viên thành công");
      setIsEditing(false);
      setEditForm(null);

      // Refresh search results
      if (searchQuery) {
        const params = /^\d+$/.test(searchQuery)
          ? { studentId: searchQuery }
          : { faculty: searchQuery };
        const results = await searchStudents(params);
        setSearchResults(results);
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error(
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi cập nhật thông tin sinh viên"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof UpdateStudentDTO, value: string) => {
    setEditForm((prev: UpdateStudentDTO | null) =>
      prev ? { ...prev, [field]: value } : null
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Quản lý sinh viên</h2>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Nhập MSSV hoặc mã khoa để tìm kiếm..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  MSSV
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Họ và tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Lớp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Khoa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  GPA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tín chỉ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {searchResults.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedStudent(student)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.class}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.faculty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.gpa.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.credits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        searchQuery &&
        !loading && (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">Không tìm thấy sinh viên nào</p>
          </div>
        )
      )}

      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-lg font-medium mb-4">
              Thông tin chi tiết sinh viên
            </h3>
            {isEditing ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editForm?.email || ""}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={editForm?.sdt || ""}
                      onChange={(e) => handleInputChange("sdt", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CCCD
                    </label>
                    <input
                      type="text"
                      value={editForm?.cccd || ""}
                      onChange={(e) =>
                        handleInputChange("cccd", e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      value={editForm?.dia_chi || ""}
                      onChange={(e) =>
                        handleInputChange("dia_chi", e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditForm(null);
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Đang lưu..." : "Lưu thay đổi"}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">MSSV</p>
                    <p className="font-medium">{selectedStudent.studentId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Họ và tên</p>
                    <p className="font-medium">{selectedStudent.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Số điện thoại</p>
                    <p className="font-medium">{selectedStudent.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ngày sinh</p>
                    <p className="font-medium">
                      {selectedStudent.birthDate.toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Giới tính</p>
                    <p className="font-medium">{selectedStudent.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">CCCD</p>
                    <p className="font-medium">{selectedStudent.idNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Địa chỉ</p>
                    <p className="font-medium">{selectedStudent.address}</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => handleEdit(selectedStudent)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    Đóng
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
