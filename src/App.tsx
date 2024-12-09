import React from "react";
import { LoginPage } from "./pages/LoginPage";
import { StudentDashboard } from "./pages/student/StudentDashboard";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { useState } from "react";
import { User } from "./types";

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      {!user ? (
        <LoginPage onLogin={setUser} />
      ) : user.role === "student" ? (
        <StudentDashboard user={user} onLogout={() => setUser(null)} />
      ) : (
        <AdminDashboard user={user} onLogout={() => setUser(null)} />
      )}
    </div>
  );
}

export default App;
