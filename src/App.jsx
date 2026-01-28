import React, { useState } from "react"
import MealLog from "./MealLog";

const EMPTY_WEEK = {
  Sunday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
  Monday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
  Tuesday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
  Wednesday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
  Thursday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
  Friday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
  Saturday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
};

export default function App() {
  const [weeklyLog, setWeeklyLog] = useState(EMPTY_WEEK);
  const [activeMealPeriod, setActiveMealPeriod] = useState("breakfast");

  return (
    <MealLog
      weeklyLog={weeklyLog}
      setWeeklyLog={setWeeklyLog}
      activeMealPeriod={activeMealPeriod}
      setActiveMealPeriod={setActiveMealPeriod}
    />
  );
}