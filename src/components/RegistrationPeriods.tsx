import React, { useEffect, useState } from "react";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import {
  RegistrationPeriod,
  getRegistrationPeriods,
  checkRegistrationPeriodValidity,
} from "../services/api";
import { toast } from "react-hot-toast";

interface RegistrationPeriodsProps {
  onPeriodSelect: (period: RegistrationPeriod) => void;
}

export function RegistrationPeriods({
  onPeriodSelect,
}: RegistrationPeriodsProps) {
  const [periods, setPeriods] = useState<RegistrationPeriod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validating, setValidating] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        setLoading(true);
        const data = await getRegistrationPeriods();
        setPeriods(data);
      } catch (err) {
        setError("Không thể tải danh sách đợt đăng ký");
      } finally {
        setLoading(false);
      }
    };

    fetchPeriods();
  }, []);

  const handlePeriodClick = async (period: RegistrationPeriod) => {
    try {
      setValidating(period.id);
      const { valid, message } = await checkRegistrationPeriodValidity(
        period.id,
        period.status
      );

      if (valid) {
        onPeriodSelect(period);
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi kiểm tra thời gian đăng ký"
      );
    } finally {
      setValidating(null);
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
    return (
      <div className="p-6 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (periods.length === 0) {
    return (
      <div className="p-6 text-center">
        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Không có đợt đăng ký nào</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Đợt đăng ký</h2>
      <div className="space-y-4">
        {periods.map((period) => (
          <div
            key={period.id}
            onClick={() => handlePeriodClick(period)}
            className={`border rounded-lg p-4 hover:border-indigo-500 cursor-pointer transition-all hover:shadow-md bg-white ${
              validating === period.id ? "opacity-75" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {period.name}
                </h3>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {new Date(period.startDate).toLocaleDateString()} -{" "}
                    {new Date(period.endDate).toLocaleDateString()}
                  </span>
                </div>
                {period.description && (
                  <p className="mt-2 text-sm text-gray-600">
                    {period.description}
                  </p>
                )}
              </div>
              <div className="flex items-center">
                {validating === period.id ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                ) : (
                  <>
                    <Clock className="h-4 w-4 mr-2" />
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        period.status === "active"
                          ? "bg-green-100 text-green-800"
                          : period.status === "upcoming"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {period.status === "active"
                        ? "Đang diễn ra"
                        : period.status === "upcoming"
                        ? "Sắp diễn ra"
                        : "Đã kết thúc"}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
