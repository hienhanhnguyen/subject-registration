import React, { useState } from "react";
import {
  Menu,
  X,
  BookOpen,
  GraduationCap,
  CalendarRange,
  Users,
  LogOut,
  User,
} from "lucide-react";

interface NavItem {
  icon: React.ReactElement;
  label: string;
  value: string;
}

interface LayoutProps {
  children: React.ReactNode;
  user: { role: string };
  activeSection: string;
  onNavChange: (section: string) => void;
  onLogout: () => void;
}

export function Layout({
  children,
  user,
  activeSection,
  onNavChange,
  onLogout,
}: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const getNavItems = (): NavItem[] => {
    if (user.role === "student") {
      return [
        {
          icon: <BookOpen />,
          label: "Đăng ký môn học",
          value: "registration",
        },
        {
          icon: <GraduationCap />,
          label: "Bảng điểm",
          value: "transcript",
        },
        {
          icon: <User />,
          label: "Thông tin cá nhân",
          value: "profile",
        },
      ];
    } else {
      return [
        {
          icon: <CalendarRange />,
          label: "Đợt đăng ký",
          value: "registration",
        },
        {
          icon: <Users />,
          label: "Quản lý",
          value: "functions",
        },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <div
            className={`flex items-center space-x-3 ${
              !isSidebarOpen && "hidden"
            }`}
          >
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">System</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-8">
          {navItems.map((item) => (
            <a
              key={item.value}
              onClick={() => onNavChange(item.value)}
              className={`flex items-center px-4 py-3 cursor-pointer text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${
                activeSection === item.value
                  ? "bg-indigo-50 text-indigo-600"
                  : ""
              }`}
            >
              <span className="p-2">{item.icon}</span>
              {isSidebarOpen && <span className="ml-3">{item.label}</span>}
            </a>
          ))}
          <a
            onClick={() => {
              onLogout();
            }}
            className="flex items-center px-4 py-3 cursor-pointer text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors mt-auto"
          >
            <span className="p-2">
              <LogOut />
            </span>
            {isSidebarOpen && <span className="ml-3">Đăng xuất</span>}
          </a>
        </nav>
      </div>

      {/* Nội dung chính bên phải màn hình ở đây */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
