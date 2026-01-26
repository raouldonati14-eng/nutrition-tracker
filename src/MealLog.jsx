import React, { useState } from "react";
import Header from "./Header";

/* ---------- DAILY TARGETS ---------- */
const DAILY_TARGETS = {
  calories: 2000,
  protein: 135,
  carbs: 255,
  fat: 45,
};

/* ---------- Helper for scoring ---------- */
const scoreMacro = (percent) => {
  if (percent >= 90 && percent <= 110) return 100;
  if ((percent >= 70 && percent < 90) || (percent > 110 && percent <= 130)) return 75;
  return 50;
};

const gradeItemWithStatus = (item) => {
  const percents = {
    calories: ((item.cals / DAILY_TARGETS.calories) * 100).toFixed(1),
    protein: ((item.protein / DAILY_TARGETS.protein) * 100).toFixed(1),
    carbs: ((item.carbs / DAILY_TARGETS.carbs) * 100).toFixed(1),
    fat: ((item.fat / DAILY_TARGETS.fat) * 100).toFixed(1),
  };

  const avgScore =
    (scoreMacro(percents.calories) +
      scoreMacro(percents.protein) +
      scoreMacro(percents.carbs) +
      scoreMacro(percents.fat)) / 4;

  let letter;
  if (avgScore >= 85) letter = "A";
  else if (avgScore >= 70) letter = "B";
  else letter = "C";

  const status = {};
  Object.entries(percents).forEach(([key, val]) => {
    const v = parseFloat(val);
    if (v >= 90 && v <= 110) status[key] = "✅";
    else if ((v >= 70 && v < 90) || (v > 110 && v <= 130)) status[key] = "⚠️";
    else status[key] = "❌";
  });

  return { letter, status, percents };
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

export default function MealLog({ weeklyLog, setWeeklyLog, activeMealPeriod, setActiveMealPeriod }) {
  const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [studentName, setStudentName] = useState("");
  const [showInstructions, setShowInstructions] = useState(true);
  const [manualItem, setManualItem] = useState({ name: "", protein: 0, carbs: 0, fat: 0, cals: 0 });

  const addFood = (food) => {
    setWeeklyLog(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [activeMealPeriod]: [...prev[selectedDay][activeMealPeriod], food]
      }
    }));
  };

  const removeFood = (idx) => {
    setWeeklyLog(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [activeMealPeriod]: prev[selectedDay][activeMealPeriod].filter((_, i) => i !== idx)
      }
    }));
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualItem.name) return;
    const calculatedCalories = manualItem.protein*4 + manualItem.carbs*4 + manualItem.fat*9;
    addFood({ ...manualItem, cals: calculatedCalories });
    setManualItem({ name:"", protein:0, carbs:0, fat:0, cals:0 });
  };

  const macroColor = (percent) => percent >= 90 && percent <=110 ? "#2e7d32" : percent>=70 ? "#f9a825" : "#c62828";

  const mealTotals = weeklyLog[selectedDay][activeMealPeriod].reduce((acc, item) => ({
    protein: acc.protein + (item.protein||0),
    carbs: acc.carbs + (item.carbs||0),
    fat: acc.fat + (item.fat||0),
    cals: acc.cals + (item.cals||0)
  }), { protein:0, carbs:0, fat:0, cals:0 });

  const mealGrade = gradeItemWithStatus(mealTotals);

  const weeklyTotals = Object.values(weeklyLog).reduce((acc, dayMeals) => {
    Object.values(dayMeals).forEach(mealFoods => {
      mealFoods.forEach(food => {
        acc.protein += food.protein||0;
        acc.carbs += food.carbs||0;
        acc.fat += food.fat||0;
        acc.cals += food.cals||0;
      });
    });
    return acc;
  }, { protein:0, carbs:0, fat:0, cals:0 });

  const weeklyGrade = gradeItemWithStatus(weeklyTotals);

  const downloadCSV = () => {
    let rows = [["Student","Day","Meal","Food","Calories","Protein","Carbs","Fat","Grade","Cal Status","Cal %","Protein Status","Protein %","Carbs Status","Carbs %","Fat Status","Fat %"]];

    Object.entries(weeklyLog).forEach(([day, meals]) => {
      Object.entries(meals).forEach(([meal, foods]) => {
        foods.forEach(food => {
          const { letter, status, percents } = gradeItemWithStatus(food);
          rows.push([
            studentName || "Unknown",
            day,
            meal,
            food.name,
            food.cals,
            food.protein,
            food.carbs,
            food.fat,
            letter,
            status.calories, percents.calories+"%",
            status.protein, percents.protein+"%",
            status.carbs, percents.carbs+"%",
            status.fat, percents.fat+"%"
          ]);
        });
      });
    });

    const weeklyGradeCSV = gradeItemWithStatus(weeklyTotals);
    rows.push([
      studentName || "Unknown",
      "WEEKLY TOTAL",
      "",
      "",
      weeklyTotals.cals,
      weeklyTotals.protein,
      weeklyTotals.carbs,
      weeklyTotals.fat,
      weeklyGradeCSV.letter,
      weeklyGradeCSV.status.calories, weeklyGradeCSV.percents.calories+"%",
      weeklyGradeCSV.status.protein, weeklyGradeCSV.percents.protein+"%",
      weeklyGradeCSV.status.carbs, weeklyGradeCSV.percents.carbs+"%",
      weeklyGradeCSV.status.fat, weeklyGradeCSV.percents.fat+"%"
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(r => r.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "weekly_food_log.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ maxWidth: 900, margin:"0 auto", padding:20 }}>
      <Header title="Food Selection" subtitle="2000 calories · Macro Tracking" />

      {/* Student Name */}
      <div style={{ marginBottom:15 }}>
        <label>
          <strong>Student Name:</strong>{" "}
          <input type="text" value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder="Last, First" style={{ marginLeft:10 }} />
        </label>
      </div>

      {/* Instructions */}
      <div style={{ border:"1px solid #ccc", borderRadius:8, padding:15, marginBottom:20, background:"#fafafa" }}>
        <button onClick={()=>setShowInstructions(!showInstructions)} style={{ marginBottom:10, background:"none", border:"none", color:"#1976d2", cursor:"pointer", fontWeight:"bold" }}>
          {showInstructions ? "▼ Hide Instructions" : "▶ Show Instructions"}
        </button>
        {showInstructions && (
          <div style={{ lineHeight:1.6 }}>
            <p><strong>Assignment Instructions</strong></p>
            <ol>
              <li>Enter your full name at the top (Last, First).</li>
              <li>Select the correct day of the week.</li>
              <li>Choose the meal period (Breakfast, Lunch, Dinner, Snacks).</li>
              <li>Add foods you ate using the preset buttons or manual entry.</li>
              <li>Repeat for all meals for the entire week.</li>
              <li>Review totals for accuracy.</li>
              <li>Download and submit your CSV file when finished.</li>
            </ol>
            <p><strong>Goal:</strong> ~2000 calories per day with balanced macros.</p>
          </div>
        )}
      </div>

      {/* Day Selector */}
      <div style={{ display:"flex", justifyContent:"space-around", marginBottom:20 }}>
        {DAYS.map(day => <button key={day} onClick={()=>setSelectedDay(day)} style={{ fontWeight:selectedDay===day?"bold":"normal" }}>{day}</button>)}
      </div>

      {/* Meal Selector */}
      <div style={{ display:"flex", justifyContent:"space-around", marginBottom:20 }}>
        {["breakfast","lunch","dinner","snacks"].map(meal => (
          <button key={meal} onClick={()=>setActiveMealPeriod(meal)} style={{ fontWeight:activeMealPeriod===meal?"bold":"normal" }}>
            {meal.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Preset Foods */}
      <h3>{activeMealPeriod.toUpperCase()} Options</h3>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12, marginBottom:20 }}>
        {FOOD_PRESETS[activeMealPeriod].map((food,idx)=>(
          <button key={idx} onClick={()=>addFood(food)}>
            {food.name} – {food.cals} cal | P:{food.protein}g C:{food.carbs}g F:{food.fat}g
          </button>
        ))}
      </div>

      {/* Manual Entry */}
      <form onSubmit={handleManualSubmit} style={{ marginTop:30 }}>
        <h3>Manual Entry</h3>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div>
            <label>Food Name</label>
            <input value={manualItem.name} onChange={e=>setManualItem({...manualItem,name:e.target.value})}/>
          </div>
          <div>
            <label>Calories (auto)</label>
            <input type="number" value={manualItem.cals} disabled/>
          </div>
          <div>
            <label>Protein (g)</label>
            <input type="number" value={manualItem.protein} onChange={e=>setManualItem({...manualItem,protein:+e.target.value})}/>
          </div>
          <div>
            <label>Carbohydrates (g)</label>
            <input type="number" value={manualItem.carbs} onChange={e=>setManualItem({...manualItem,carbs:+e.target.value})}/>
          </div>
          <div>
            <label>Fats (g)</label>
            <input type="number" value={manualItem.fat} onChange={e=>setManualItem({...manualItem,fat:+e.target.value})}/>
          </div>
        </div>
        <button type="submit" style={{ marginTop:15 }}>Add Food</button>
      </form>

      {/* Totals */}
      <div style={{ marginTop:30 }}>
        <strong>Totals</strong><br/>
        <span style={{ color:macroColor((mealTotals.protein/DAILY_TARGETS.protein)*100) }}>Protein: {mealTotals.protein}g</span><br/>
        <span style={{ color:macroColor((mealTotals.carbs/DAILY_TARGETS.carbs)*100) }}>Carbs: {mealTotals.carbs}g</span><br/>
        <span style={{ color:macroColor((mealTotals.fat/DAILY_TARGETS.fat)*100) }}>Fat: {mealTotals.fat}g</span><br/>
        Calories: {mealTotals.cals}
      </div>

      {/* Logged Foods */}
      <h3 style={{ marginTop: 20 }}>Logged Foods</h3>
      <ul>
        {weeklyLog[selectedDay][activeMealPeriod].map((food, idx) => (
          <li key={idx}>
            {food.name} — {food.cals} cal
            <button onClick={() => removeFood(idx)}>❌</button>
          </li>
        ))}
      </ul>

      {/* Meal & Weekly Grades Summary */}
      <div style={{ marginTop: 30, borderTop: "1px solid #ccc", paddingTop: 20 }}>
        <h3>Grades Summary</h3>

        {/* Current Meal */}
        <div style={{ marginBottom: 15 }}>
          <strong>{selectedDay} - {activeMealPeriod.toUpperCase()}</strong><br />
          Grade: <span style={{ color: mealGrade.letter==="A"?"#2e7d32":mealGrade.letter==="B"?"#f9a825":"#c62828" }}>{mealGrade.letter}</span><br/>
          Calories: {mealTotals.cals} ({mealGrade.status.calories})<br/>
          Protein: {mealTotals.protein}g ({mealGrade.status.protein})<br/>
          Carbs: {mealTotals.carbs}g ({mealGrade.status.carbs})<br/>
          Fat: {mealTotals.fat}g ({mealGrade.status.fat})
        </div>

        {/* Weekly Total */}
        <div>
          <strong>Weekly Total</strong><br />
          Grade: <span style={{ color: weeklyGrade.letter==="A"?"#2e7d32":weeklyGrade.letter==="B"?"#f9a825":"#c62828" }}>{weeklyGrade.letter}</span><br/>
          Calories: {weeklyTotals.cals} ({weeklyGrade.status.calories})<br/>
          Protein: {weeklyTotals.protein}g ({weeklyGrade.status.protein})<br/>
          Carbs: {weeklyTotals.carbs}g ({weeklyGrade.status.carbs})<br/>
          Fat: {weeklyTotals.fat}g ({weeklyGrade.status.fat})
        </div>
      </div>

      {/* CSV Export */}
      <button onClick={downloadCSV} style={{ marginTop: 20, marginBottom: 20 }}>
        Download Weekly Food Log (CSV)
      </button>
    </div>
  );
}