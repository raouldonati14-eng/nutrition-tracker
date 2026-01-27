import React from "react";

// Daily targets for grading percentages
const DAILY_TARGETS = {
  calories: 2000,
  protein: 135,
  carbs: 255,
  fat: 45,
};

// Simple grade calculator
const calculateGrade = (count) => {
  const percent = Math.min((count / 10) * 100, 100); // max 100%
  let letter = "";
  if (percent >= 90) letter = "A";
  else if (percent >= 80) letter = "B";
  else if (percent >= 70) letter = "C";
  else if (percent >= 60) letter = "D";
  else letter = "F";
  return { percent, letter };
};

export default function WeeklySummary({ weeklyLog }) {
  const DAYS = Object.keys(weeklyLog); // ["Sunday", "Monday", ... ]

  // Calculate totals per day
  const dailyTotals = DAYS.map((day) => {
    const dayLog = weeklyLog[day];
    const totals = {
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
      itemCount: 0,
    };

    ["breakfast", "lunch", "dinner", "snacks"].forEach((meal) => {
      dayLog[meal].forEach((item) => {
        totals.protein += item.protein || 0;
        totals.carbs += item.carbs || 0;
        totals.fat += item.fat || 0;
        totals.calories += item.cals || 0;
        totals.itemCount += 1;
      });
    });

    const grade = calculateGrade(totals.itemCount);

    const targetPercent = {
      calories: (totals.calories / DAILY_TARGETS.calories) * 100,
      protein: (totals.protein / DAILY_TARGETS.protein) * 100,
      carbs: (totals.carbs / DAILY_TARGETS.carbs) * 100,
      fat: (totals.fat / DAILY_TARGETS.fat) * 100,
    };

    return { day, totals, grade, targetPercent };
  });

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Weekly Summary</h2>
      {dailyTotals.map(({ day, totals, grade, targetPercent }) => (
        <div key={day} style={{ marginBottom: 20, borderBottom: "1px solid #ccc", paddingBottom: 10 }}>
          <h3>{day}</h3>
          <p>
            <strong>Totals:</strong> P: {totals.protein}g ({targetPercent.protein.toFixed(0)}%),{" "}
            C: {totals.carbs}g ({targetPercent.carbs.toFixed(0)}%), F: {totals.fat}g ({targetPercent.fat.toFixed(0)}%), Calories: {totals.calories} ({targetPercent.calories.toFixed(0)}%)
          </p>
          <p>
            <strong>Grade:</strong> {grade.letter} ({grade.percent.toFixed(0)}%)
          </p>
        </div>
      ))}
    </div>
  );
}