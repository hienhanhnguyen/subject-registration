import React, { useState } from "react";
import { RegistrationPeriods } from "../../components/RegistrationPeriods";
import { CourseSearch } from "../../components/CourseSearch";
import { RegistrationPeriod } from "../../services/api";

export function CourseRegistration() {
  const [selectedPeriod, setSelectedPeriod] =
    useState<RegistrationPeriod | null>(null);
  const [searchResults, setSearchResults] = useState<any[] | null>(null);

  const handlePeriodSelect = (period: RegistrationPeriod) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="p-6">
      {selectedPeriod ? (
        <CourseSearch
          period={selectedPeriod}
          onBack={() => {
            setSelectedPeriod(null);
            setSearchResults(null);
          }}
          searchResults={searchResults}
          onSearch={setSearchResults}
        />
      ) : (
        <RegistrationPeriods onPeriodSelect={handlePeriodSelect} />
      )}
    </div>
  );
}
