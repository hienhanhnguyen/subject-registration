import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { CourseRegistration } from "./CourseRegistration";
import { Transcript } from "./Transcript";
import { User } from "../../types";

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
}

export function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [activeSection, setActiveSection] = useState<
    "registration" | "transcript"
  >("registration");

  return (
    <Layout
      user={user}
      activeSection={activeSection}
      onNavChange={(section) =>
        setActiveSection(section as "registration" | "transcript")
      }
      onLogout={onLogout}
    >
      {activeSection === "registration" ? (
        <CourseRegistration />
      ) : (
        <Transcript />
      )}
    </Layout>
  );
}
