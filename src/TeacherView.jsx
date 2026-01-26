import React, { useState } from "react";

export default function TeacherView({ weeklyLog }) {
  const [showCSV, setShowCSV] = useState(false);

  // Convert weeklyLog to CSV string
  const generateCSV = () => {
    const rows = [];
    const headers = ["Day", "Meal", "Food", "Calories", "Protein", "Carbs", "Fat"];
    rows.push(headers.join(","));

    Object.keys(weeklyLog).forEach(day => {
      ["breakfast", "lunch", "dinner", "snacks"].forEach(meal => {
        weeklyLog[day][meal].forEach(item => {
          rows.push([
            day,
            meal,
            item.name,
            item.cals,
            item.protein,
            item.carbs,
            item.fat
          ].join(","));
        });
      });
    });

    return rows.join("\n");
  };

  // Trigger CSV download
  const downloadCSV = () => {
    const csv = generateCSV();
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", "weekly_log.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Macro grading helper
  const calculateGrade = (totalItems) => {
    const percent = Math.min((totalItems / 10) * 100, 100);
    let letter = "";
    if (percent >= 90) letter = "A";
    else if (percent >= 80) letter = "B";
    else if (percent >= 70) letter = "C";
    else if (percent >= 60) letter = "D";
    else letter = "F";
    return { percent, letter };
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Teacher View</h2>

      <button
        onClick={() => setShowCSV(prev => !prev)}
        style={{ marginBottom: 10 }}
      >
        {showCSV ? "Hide CSV" : "Show CSV Export"}
      </button>

      {showCSV && (
        <div>
          <button onClick={downloadCSV} style={{ marginBottom: 10 }}>
            Download CSV
          </button>
          <textarea
            readOnly
            value={generateCSV()}
            style={{ width: "100%", height: 300 }}
          />
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <h3>All Student Logs</h3>
        {Object.keys(weeklyLog).map(day => (
          <div key={day}>
            <h4>{day}</h4>
            {["breakfast", "lunch", "dinner", "snacks"].map(meal => (
              <div key={meal}>
                <strong>{meal.toUpperCase()}</strong>
                <ul>
                  {weeklyLog[day][meal].length === 0 ? (
                    <li>No items logged</li>
                  ) : (
                    weeklyLog[day][meal].map((item, idx) => (
                      <li key={idx}>
                        {item.name} — {item.cals} kcal, P:{item.protein}g, C:{item.carbs}g, F:{item.fat}g
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ))}
            <div style={{ marginBottom: 10 }}>
              <strong>Grade: </strong>
              {calculateGrade(
                Object.values(weeklyLog[day]).flat().length
              ).letter}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}