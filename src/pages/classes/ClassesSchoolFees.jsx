import React from "react";
import { useLocation } from "react-router-dom";

const ClassesSchoolFees = () => {
  const location = useLocation();
  const { state } = location;
  console.log(state)
  return <div>FeesPerStudentClass</div>;
};

export default ClassesSchoolFees