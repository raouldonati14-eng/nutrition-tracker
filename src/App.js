import React, { useState } from "react";
import MealLog from "./MealLog";
import TeacherView from "./TeacherView";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const createEmptyWeek = () =>
  DAYS.reduce((acc, day) => {
    acc[day] = { breakfast: [], lunch: [], dinner: [], snacks: [] };
    return acc;
  }, {});

export default function App() {
  const [activeTab, setActiveTab] = useState("student");
  const [activeMealPeriod, setActiveMealPeriod] = useState("breakfast");
  const [weeklyLog, setWeeklyLog] = useState(createEmptyWeek());

  const IS_TEACHER_MODE = false; // change to true ONLY for teacher access

  return (
    <div style={{ padding: 20 }}>
      {/* TAB BAR */}
      <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
        <button
          onClick={() => setActiveTab("student")}
          style={{ fontWeight: activeTab === "student" ? "bold" : "normal" }}
        >
          Student View
        </button>

        {IS_TEACHER_MODE && (
          <button
            onClick={() => setActiveTab("teacher")}
            style={{ fontWeight: activeTab === "teacher" ? "bold" : "normal" }}
          >
            Teacher View
          </button>
        )}
      </div>

      <hr />

      {/* CONTENT */}
      {activeTab === "student" ? (
        <MealLog
          weeklyLog={weeklyLog}
          setWeeklyLog={setWeeklyLog}
          activeMealPeriod={activeMealPeriod}
          setActiveMealPeriod={setActiveMealPeriod}
        />
      ) : (
        <TeacherView weeklyLog={weeklyLog} />
      )}
    </div>
  );
}