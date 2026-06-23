import { useState } from "react";

function App() {
  const [numSubjects, setNumSubjects] = useState(0);
  const [marks, setMarks] = useState([]);
  const [result, setResult] = useState(null);

  // Create input fields dynamically
  const handleNumSubjects = (e) => {
    const count = parseInt(e.target.value) || 0;
    setNumSubjects(count);
    setMarks(Array(count).fill("")); // reset marks
  };

  // Update marks
  const handleMarkChange = (index, value) => {
    const newMarks = [...marks];
    newMarks[index] = value;
    setMarks(newMarks);
  };

  // Calculate result
  const calculateResult = () => {
    const numericMarks = marks.map(m => parseFloat(m) || 0);
    const total = numericMarks.reduce((a, b) => a + b, 0);
    const average = total / numSubjects;

    // Grade logic
    let grade;
    if (average >= 90) grade = "A+";
    else if (average >= 80) grade = "A";
    else if (average >= 70) grade = "B";
    else if (average >= 60) grade = "C";
    else if (average >= 50) grade = "D";
    else grade = "F";

    // Pass/Fail logic
    const pass = numericMarks.every(m => m >= 40) ? "PASS" : "FAIL";

    setResult({ total, average, grade, pass });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🎓 Student Marks & Grade Calculator</h2>

      <label>Enter number of subjects: </label>
      <input type="number" onChange={handleNumSubjects} min="1" />

      <div style={{ marginTop: "10px" }}>
        {marks.map((mark, i) => (
          <div key={i}>
            <label>Subject {i + 1} Marks: </label>
            <input
              type="number"
              value={mark}
              onChange={(e) => handleMarkChange(i, e.target.value)}
              min="0"
              max="100"
            />
          </div>
        ))}
      </div>

      <button onClick={calculateResult} style={{ marginTop: "15px" }}>
        Calculate Result
      </button>

      {result && (
        <div style={{ marginTop: "20px", fontWeight: "bold" }}>
          <p>Total Marks: {result.total}</p>
          <p>Average Marks: {result.average.toFixed(2)}</p>
          <p>Grade: {result.grade}</p>
          <p>Result: {result.pass}</p>
        </div>
      )}
    </div>
  );
}

export default App;
