import React from "react";
import { calculateGrade } from "./gradingUtils";

export default function AnalysisPage({ weeklyLog, DAYS, DAILY_TARGETS }) {
  const totalsByDay = DAYS.map(day => {
    const meals = weeklyLog[day];
    const totals = { protein: 0, carbs: 0, fat: 0, cals: 0, count: 0 };

    Object.values(meals).forEach(meal =>
      meal.forEach(item => {
        totals.protein += item.protein || 0;
        totals.carbs += item.carbs || 0;
        totals.fat += item.fat || 0;
        totals.cals += item.cals || 0;
        totals.count++;
      })
    );

    return { day, ...totals };
  });

  const weeklyTotals = totalsByDay.reduce(
    (acc, d) => ({
      protein: acc.protein