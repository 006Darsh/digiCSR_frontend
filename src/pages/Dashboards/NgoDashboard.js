import React from "react";
import NgoNavigation from "../../components/Dashboards/NgoNavigation";
import Homepage from "../../components/Dashboards/CompanyFeatures/Homepage";

const NgoDashboard = () => {
  return (
    <div>
      <NgoNavigation />
      <Homepage userType={"NGO"} />
    </div>
  );
};

export default NgoDashboard;
