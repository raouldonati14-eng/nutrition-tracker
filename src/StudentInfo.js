import React, { useState } from "react";

export default function StudentInfo({ studentInfo, setStudentInfo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({ ...studentInfo, [name]: value });
  };

  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <h2>Student Information</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={studentInfo.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </div>
        <div>
          <label>Class Period:</label>
          <input
            type="text"
            name="classPeriod"
            value={studentInfo.classPeriod}
            onChange={handleChange}
            placeholder="Enter period"
          />
        </div>
      </div>
    </div>
  );
}