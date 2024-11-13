import React from "react";
import { Calendar, Clock } from "lucide-react";
import { RegistrationPeriod } from "../types";

interface RegistrationPeriodsProps {
  onPeriodSelect: (period: RegistrationPeriod) => void;
}

export function RegistrationPeriods({
  onPeriodSelect,
}: RegistrationPeriodsProps) {
  const periods: RegistrationPeriod[] = [
    {
      id: 1,
      department: "Computer Science",
      startDate: "2024-03-15",
      endDate: "2024-03-20",
      status: "active",
    },
    {
      id: 2,
      department: "Engineering",
      startDate: "2024-03-18",
      endDate: "2024-03-23",
      status: "upcoming",
    },
    {
      id: 3,
      department: "Business Administration",
      startDate: "2024-03-20",
      endDate: "2024-03-25",
      status: "upcoming",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Đợt đăng ký</h2>
      <div className="space-y-4">
        {periods.map((period) => (
          <div
            key={period.id}
            onClick={() => onPeriodSelect(period)}
            className="border rounded-lg p-4 hover:border-indigo-500 cursor-pointer transition-all hover:shadow-md bg-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {period.department}
                </h3>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {new Date(period.startDate).toLocaleDateString()} -{" "}
                    {new Date(period.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    period.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {period.status.charAt(0).toUpperCase() +
                    period.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
