import React, { useState } from "react";
import MealLog from "./MealLog";
import TeacherView from "./TeacherView";
import Header from "./Header";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
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

  return (
  <div
    style={{
      padding: 20,
      maxWidth: 1000,
      margin: "0 auto",
    }}
  >
      {/* HEADER */}
      <Header title="Weekly Food Journal" />

      {/* TAB BAR (CENTER ALIGNED) */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <button
          onClick={() => setActiveTab("student")}
          style={{ fontWeight: activeTab === "student" ? "bold" : "normal" }}
        >
          Student View
        </button>

        <button
          onClick={() => setActiveTab("teacher")}
          style={{ fontWeight: activeTab === "teacher" ? "bold" : "normal" }}
        >
          Teacher View
        </button>
      </div>

      <hr />

      {/* CENTERED CONTENT */}
      <div style={{ display: "flex", justifyContent: "Left", marginTop: 20 }}>
        <div style={{ width: "100%", maxWidth: 800 }}>
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
      </div>
    </div>
  );
}