import React, { useState } from "react";

/* ---------- DAILY TARGETS ---------- */
const DAILY_TARGETS = {
  calories: 2000,
  protein: 135,
  carbs: 255,
  fat: 45,
};

/* ---------- FOOD PRESETS ---------- */
const FOOD_PRESETS = {
  breakfast: [
    { name: "Eggs (2)", protein: 12, carbs: 2, fat: 10, cals: 160 },
    { name: "Oatmeal", protein: 6, carbs: 27, fat: 3, cals: 150 },
    { name: "Toast", protein: 4, carbs: 22, fat: 2, cals: 120 },
    { name: "Bacon (2)", protein: 6, carbs: 0, fat: 8, cals: 90 },
    { name: "Greek Yogurt", protein: 15, carbs: 8, fat: 4, cals: 120 },
    { name: "Banana", protein: 1, carbs: 27, fat: 0, cals: 105 },
    { name: "Pancakes", protein: 6, carbs: 30, fat: 7, cals: 220 },
    { name: "Protein Shake", protein: 25, carbs: 5, fat: 3, cals: 150 },
    { name: "Hash Browns", protein: 2, carbs: 20, fat: 9, cals: 180 },
    { name: "Orange Juice", protein: 2, carbs: 26, fat: 0, cals: 110 }
  ],
  lunch: [
    { name: "Chicken Sandwich", protein: 30, carbs: 35, fat: 8, cals: 350 },
    { name: "Turkey Wrap", protein: 28, carbs: 30, fat: 7, cals: 320 },
    { name: "Salad", protein: 10, carbs: 12, fat: 6, cals: 180 },
    { name: "Burger", protein: 25, carbs: 30, fat: 15, cals: 450 },
    { name: "Pizza Slice", protein: 12, carbs: 36, fat: 10, cals: 285 },
    { name: "Rice Bowl", protein: 18, carbs: 45, fat: 8, cals: 400 },
    { name: "PB&J", protein: 12, carbs: 40, fat: 14, cals: 380 },
    { name: "Soup", protein: 8, carbs: 20, fat: 4, cals: 160 },
    { name: "Fries", protein: 4, carbs: 45, fat: 17, cals: 365 },
    { name: "Milk", protein: 8, carbs: 12, fat: 5, cals: 150 }
  ],
  dinner: [
    { name: "Steak", protein: 40, carbs: 0, fat: 20, cals: 450 },
    { name: "Chicken Breast", protein: 35, carbs: 0, fat: 5, cals: 220 },
    { name: "Salmon", protein: 34, carbs: 0, fat: 18, cals: 400 },
    { name: "Pasta", protein: 12, carbs: 45, fat: 8, cals: 320 },
    { name: "Rice", protein: 6, carbs: 44, fat: 1, cals: 200 },
    { name: "Vegetables", protein: 5, carbs: 10, fat: 1, cals: 80 },
    { name: "Tacos", protein: 18, carbs: 30, fat: 12, cals: 350 },
    { name: "Chicken Alfredo", protein: 30, carbs: 50, fat: 18, cals: 520 },
    { name: "Chili", protein: 22, carbs: 25, fat: 10, cals: 330 },
    { name: "Bread Roll", protein: 4, carbs: 22, fat: 2, cals: 120 }
  ],
  snacks: [
    { name: "Apple", protein: 0, carbs: 25, fat: 0, cals: 95 },
    { name: "Granola Bar", protein: 4, carbs: 24, fat: 5, cals: 140 },
    { name: "Chips", protein: 2, carbs: 15, fat: 10, cals: 160 },
    { name: "Protein Bar", protein: 20, carbs: 22, fat: 7, cals: 210 },
    { name: "Trail Mix", protein: 8, carbs: 20, fat: 12, cals: 220 },
    { name: "Yogurt", protein: 12, carbs: 10, fat: 3, cals: 110 },
    { name: "Popcorn", protein: 3, carbs: 19, fat: 4, cals: 120 },
    { name: "Cheese Stick", protein: 7, carbs: 1, fat: 6, cals: 90 },
    { name: "Crackers", protein: 3, carbs: 18, fat: 5, cals: 130 },
    { name: "Smoothie", protein: 10, carbs: 30, fat: 2, cals: 180 }
  ]

};

export default function MealLog({
  weeklyLog,
  setWeeklyLog,
  activeMealPeriod,
  setActiveMealPeriod,
}) {
  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [manualItem, setManualItem] = useState({
    name: "",
    protein: 0,
    carbs: 0,
    fat: 0,
    cals: 0,
  });

  const addFood = (food) => {
    setWeeklyLog((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [activeMealPeriod]: [
          ...prev[selectedDay][activeMealPeriod],
          food,
        ],
      },
    }));
  };

  const removeFood = (index) => {
    setWeeklyLog((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [activeMealPeriod]: prev[selectedDay][activeMealPeriod].filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualItem.name) return;

    const calculatedCalories =
      manualItem.protein * 4 +
      manualItem.carbs * 4 +
      manualItem.fat * 9;

    addFood({ ...manualItem, cals: calculatedCalories });

    setManualItem({
      name: "",
      protein: 0,
      carbs: 0,
      fat: 0,
      cals: 0,
    });
  };

  const totals = weeklyLog[selectedDay][activeMealPeriod].reduce(
    (acc, item) => ({
      protein: acc.protein + (item.protein || 0),
      carbs: acc.carbs + (item.carbs || 0),
      fat: acc.fat + (item.fat || 0),
      cals: acc.cals + (item.cals || 0),
    }),
    { protein: 0, carbs: 0, fat: 0, cals: 0 }
  );

  const targetPercent = {
    calories: (totals.cals / DAILY_TARGETS.calories) * 100,
    protein: (totals.protein / DAILY_TARGETS.protein) * 100,
    carbs: (totals.carbs / DAILY_TARGETS.carbs) * 100,
    fat: (totals.fat / DAILY_TARGETS.fat) * 100,
  };

  const macroColor = (percent) => {
    if (percent >= 90 && percent <= 110) return "#2e7d32"; // green
    if (percent >= 70) return "#f9a825"; // amber
    return "#c62828"; // red
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      {/* Day Selector */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: 20,
        }}
      >
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            style={{
              fontWeight: selectedDay === day ? "bold" : "normal",
            }}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Meal Selector */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: 20,
        }}
      >
        {["breakfast", "lunch", "dinner", "snacks"].map((meal) => (
          <button
            key={meal}
            onClick={() => setActiveMealPeriod(meal)}
            style={{
              fontWeight:
                activeMealPeriod === meal ? "bold" : "normal",
            }}
          >
            {meal.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Preset Foods */}
      <h3>{activeMealPeriod.toUpperCase()} Options</h3>
      <div style={{ display: "grid", gap: 10 }}>
        {FOOD_PRESETS[activeMealPeriod].map((food, idx) => (
          <button key={idx} onClick={() => addFood(food)}>
            {food.name} – {food.cals} cal
          </button>
        ))}
      </div>

      {/* Manual Entry Form */}
      <form onSubmit={handleManualSubmit} style={{ marginTop: 20 }}>
        <h3>Manual Entry</h3>

        <label>
          Food Name
          <input
            type="text"
            value={manualItem.name}
            onChange={(e) =>
              setManualItem({
                ...manualItem,
                name: e.target.value,
              })
            }
            required
          />
        </label>

        <label>
          Protein (g)
          <input
            type="number"
            value={manualItem.protein}
            onChange={(e) =>
              setManualItem({
                ...manualItem,
                protein: Number(e.target.value),
              })
            }
          />
        </label>

        <label>
          Carbs (g)
          <input
            type="number"
            value={manualItem.carbs}
            onChange={(e) =>
              setManualItem({
                ...manualItem,
                carbs: Number(e.target.value),
              })
            }
          />
        </label>

        <label>
          Fat (g)
          <input
            type="number"
            value={manualItem.fat}
            onChange={(e) =>
              setManualItem({
                ...manualItem,
                fat: Number(e.target.value),
              })
            }
          />
        </label>

        <button type="submit">Add Food</button>
      </form>

      {/* Totals & Summary */}
      <div style={{ marginTop: 20 }}>
        <strong>Totals</strong><br />
        <span style={{ color: macroColor(targetPercent.protein) }}>
          Protein: {totals.protein}g ({targetPercent.protein.toFixed(0)}%)
        </span><br />
        <span style={{ color: macroColor(targetPercent.carbs) }}>
          Carbs: {totals.carbs}g ({targetPercent.carbs.toFixed(0)}%)
        </span><br />
        <span style={{ color: macroColor(targetPercent.fat) }}>
          Fat: {totals.fat}g ({targetPercent.fat.toFixed(0)}%)
        </span><br />
        Calories: {totals.cals} ({targetPercent.calories.toFixed(0)}%)
      </div>

      {/* Logged Foods */}
      <h3 style={{ marginTop: 20 }}>Logged Foods</h3>
      {weeklyLog[selectedDay][activeMealPeriod].length === 0 ? (
        <p>No foods logged yet.</p>
      ) : (
        <ul>
          {weeklyLog[selectedDay][activeMealPeriod].map((food, idx) => (
            <li key={idx}>
              {food.name} — {food.cals} cal
              <button onClick={() => removeFood(idx)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}