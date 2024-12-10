import React, { useEffect, useState } from "react";
import {
  getUserProfile,
  UserProfile,
  updateProfile,
  UpdateProfileDTO,
  FIXED_ADDRESS,
} from "../services/api";
import {
  User,
  BookOpen,
  Mail,
  GraduationCap,
  Users,
  Calendar,
  Activity,
  Save,
  X,
  Edit,
} from "lucide-react";
import { toast } from "react-hot-toast";

export function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    email: "",
    dia_chi: "",
    sdt: "",
    cccd: "",
    ngay_sinh: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserProfile();
      if (!data) {
        throw new Error("No profile data received");
      }
      setProfile(data);

      // Initialize edit form with existing data
      setEditForm({
        email: data.email || "",
        dia_chi: data.dia_chi || "",
        sdt: data.sdt || "",
        cccd: data.cccd || "",
        ngay_sinh: data.ngay_sinh
          ? new Date(data.ngay_sinh).toISOString().split("T")[0]
          : "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? `Không thể tải thông tin sinh viên: ${err.message}`
          : "Không thể tải thông tin sinh viên"
      );
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (data: Partial<UpdateProfileDTO>): string | null => {
    // Email validation
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return "Email không hợp lệ";
    }

    // CCCD validation (12 digits)
    if (data.cccd && !/^\d{12}$/.test(data.cccd)) {
      return "CCCD phải có 12 chữ số";
    }

    // Phone number validation (10 digits)
    if (data.sdt && !/^0\d{9}$/.test(data.sdt)) {
      return "Số điện thoại không hợp lệ (phải bắt đầu bằng 0 và có 10 số)";
    }

    // Date validation
    if (data.ngay_sinh) {
      const date = new Date(data.ngay_sinh);
      if (isNaN(date.getTime())) {
        return "Ngày sinh không hợp lệ";
      }
    }

    // Set fixed address if dia_chi is being updated
    if (data.dia_chi !== undefined) {
      data.dia_chi = FIXED_ADDRESS.VI;
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Only include fields that have been changed
      const updateData: Partial<UpdateProfileDTO> = {};
      if (editForm.email !== profile?.email)
        updateData.email = editForm.email.trim();
      if (editForm.dia_chi !== profile?.dia_chi)
        updateData.dia_chi = FIXED_ADDRESS.VI; // Always use fixed Vietnamese address
      if (editForm.sdt !== profile?.sdt) updateData.sdt = editForm.sdt.trim();
      if (editForm.cccd !== profile?.cccd)
        updateData.cccd = editForm.cccd.trim();
      if (
        editForm.ngay_sinh !==
        (profile?.ngay_sinh
          ? new Date(profile.ngay_sinh).toISOString().split("T")[0]
          : "")
      ) {
        updateData.ngay_sinh = editForm.ngay_sinh.trim();
      }

      // Check if any fields have been changed
      if (Object.keys(updateData).length === 0) {
        toast.error("Không có thông tin nào được thay đổi");
        return;
      }

      // Validate form data
      const validationError = validateForm(updateData);
      if (validationError) {
        toast.error(validationError);
        return;
      }

      await updateProfile(updateData as UpdateProfileDTO);
      await fetchProfile(); // Refresh profile data
      setIsEditing(false);
      toast.success("Cập nhật thông tin thành công");
    } catch (err) {
      if (err instanceof Error) {
        try {
          // Try to parse error message as JSON
          const errorData = JSON.parse(err.message);
          if (Array.isArray(errorData.message)) {
            // Show all validation errors
            errorData.message.forEach((msg: string) => toast.error(msg));
          } else {
            toast.error(
              errorData.message || "Có lỗi xảy ra khi cập nhật thông tin"
            );
          }
        } catch {
          // If can't parse as JSON, show original error
          toast.error(err.message);
        }
      } else {
        toast.error("Có lỗi xảy ra khi cập nhật thông tin");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 p-4">{error}</div>;
  }

  if (!profile) {
    return (
      <div className="text-center text-gray-600 p-4">
        Không tìm thấy thông tin sinh viên
      </div>
    );
  }

  const profileItems = [
    {
      icon: <User className="w-5 h-5" />,
      label: "Họ và tên",
      value: profile.name,
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: "MSSV",
      value: profile.studentId,
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: profile.email,
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      label: "Khoa",
      value: profile.faculty,
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Ngành",
      value: profile.major,
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Niên khóa",
      value: profile.academicYear,
    },
    {
      icon: <Activity className="w-5 h-5" />,
      label: "Trạng thái",
      value: profile.status,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            Thông tin sinh viên
          </h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="text-white hover:bg-indigo-700 px-3 py-1 rounded flex items-center"
            >
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="text-white hover:bg-indigo-700 px-3 py-1 rounded flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              Hủy
            </button>
          )}
        </div>

        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
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
                  value={FIXED_ADDRESS.VI}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-600"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Địa chỉ được cố định theo địa chỉ trường
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={editForm.sdt}
                  onChange={(e) =>
                    setEditForm({ ...editForm, sdt: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CCCD
                </label>
                <input
                  type="text"
                  value={editForm.cccd}
                  onChange={(e) =>
                    setEditForm({ ...editForm, cccd: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ngày sinh
                </label>
                <input
                  type="date"
                  value={editForm.ngay_sinh}
                  onChange={(e) =>
                    setEditForm({ ...editForm, ngay_sinh: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 flex items-center"
                >
                  <X className="h-4 w-4 mr-2" />
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {loading ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 p-2 bg-indigo-50 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                    <div className="mt-1 font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
