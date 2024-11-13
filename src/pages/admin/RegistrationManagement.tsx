import React, { useState } from "react";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import { RegistrationPeriod } from "../../types";

export function RegistrationManagement() {
  const [periods, setPeriods] = useState<RegistrationPeriod[]>([
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
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newPeriod, setNewPeriod] = useState({
    department: "",
    startDate: "",
    endDate: "",
  });

  const handleAddPeriod = () => {
    if (newPeriod.department && newPeriod.startDate && newPeriod.endDate) {
      setPeriods([
        ...periods,
        {
          id: periods.length + 1,
          ...newPeriod,
          status: "upcoming",
        },
      ]);
      setIsAddingNew(false);
      setNewPeriod({ department: "", startDate: "", endDate: "" });
    }
  };

  const handleDeletePeriod = (id: number) => {
    setPeriods(periods.filter((period) => period.id !== id));
  };

  const toggleStatus = (id: number) => {
    setPeriods(
      periods.map((period) => {
        if (period.id === id) {
          return {
            ...period,
            status: period.status === "active" ? "ended" : "active",
          };
        }
        return period;
      })
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Quản lý đợt đăng ký môn học</h2>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm đợt mới
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Khoa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày bắt đầu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày kết thúc
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isAddingNew && (
              <tr>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={newPeriod.department}
                    onChange={(e) =>
                      setNewPeriod({ ...newPeriod, department: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1"
                    placeholder="Tên khoa"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="date"
                    value={newPeriod.startDate}
                    onChange={(e) =>
                      setNewPeriod({ ...newPeriod, startDate: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="date"
                    value={newPeriod.endDate}
                    onChange={(e) =>
                      setNewPeriod({ ...newPeriod, endDate: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-sm text-yellow-800 bg-yellow-100 rounded-full">
                    Upcoming
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={handleAddPeriod}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setIsAddingNew(false)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            )}
            {periods.map((period) => (
              <tr key={period.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {period.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(period.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(period.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      period.status === "active"
                        ? "text-green-800 bg-green-100"
                        : period.status === "upcoming"
                        ? "text-yellow-800 bg-yellow-100"
                        : "text-gray-800 bg-gray-100"
                    }`}
                  >
                    {period.status.charAt(0).toUpperCase() +
                      period.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleStatus(period.id)}
                      className={`${
                        period.status === "active"
                          ? "text-red-600"
                          : "text-green-600"
                      } hover:text-opacity-75`}
                    >
                      {period.status === "active" ? (
                        <X className="h-5 w-5" />
                      ) : (
                        <Check className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeletePeriod(period.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
