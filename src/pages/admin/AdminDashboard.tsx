import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { User } from "../../types";
import { RegistrationManagement } from "./RegistrationManagement";
import { AdminFunctions } from "./AdminFunctions";

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<
    "registration" | "functions"
  >("registration");

  return (
    <Layout
      user={user}
      activeSection={activeSection}
      onNavChange={(section) =>
        setActiveSection(section as "registration" | "functions")
      }
      onLogout={onLogout}
    >
      {activeSection === "registration" ? (
        <RegistrationManagement />
      ) : (
        <AdminFunctions />
      )}
    </Layout>
  );
}
