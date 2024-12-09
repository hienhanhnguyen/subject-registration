import React, { useEffect, useState } from "react";
import { getUserProfile, UserProfile } from "../services/api";
import {
  User,
  BookOpen,
  Mail,
  GraduationCap,
  Users,
  Calendar,
  Activity,
} from "lucide-react";

export function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Starting profile fetch...");

        const data = await getUserProfile();
        console.log("Profile fetch successful:", data);

        if (!data) {
          throw new Error("No profile data received");
        }

        setProfile(data);
      } catch (err) {
        console.error("Profile fetch error in component:", err);
        setError(
          err instanceof Error
            ? `Không thể tải thông tin sinh viên: ${err.message}`
            : "Không thể tải thông tin sinh viên"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
        <div className="bg-indigo-600 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            Thông tin sinh viên
          </h2>
        </div>

        <div className="p-6">
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
        </div>
      </div>
    </div>
  );
}
