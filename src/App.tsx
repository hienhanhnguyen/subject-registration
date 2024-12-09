import React from "react";
import { LoginPage } from "./pages/LoginPage";
import { StudentDashboard } from "./pages/student/StudentDashboard";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { useState, useEffect } from "react";
import { User } from "./types";
import { Toaster } from "react-hot-toast";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : user.role === "student" ? (
        <StudentDashboard user={user} onLogout={handleLogout} />
      ) : (
        <AdminDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
