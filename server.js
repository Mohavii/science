const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

// Handle POST request to save score
app.post("/save-score", (req, res) => {
  const data = req.body;
  // Write data to dashboard.json
  fs.readFile("dashboard.json", (err, jsonData) => {
    if (err) {
      return res.status(500).json({ error: "Error reading file" });
    }
    const scores = JSON.parse(jsonData);
    scores.push(data);
    fs.writeFile("dashboard.json", JSON.stringify(scores), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error writing file" });
      }
      res.json({ success: true });
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
