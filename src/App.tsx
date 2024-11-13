import React from "react";
import { LoginPage } from "./pages/LoginPage";
import { StudentDashboard } from "./pages/student/StudentDashboard";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { useState, useEffect } from "react";
import { User } from "./types";

function App() {
  const [user, setUser] = useState<User | null>(null);

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return user.role === "student" ? (
    <StudentDashboard user={user} onLogout={() => setUser(null)} />
  ) : (
    <AdminDashboard user={user} onLogout={() => setUser(null)} />
  );
  // return <>Helloword</>;
}

export default App;
