require("dotenv").config();
require("./src/db");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// ROOT CHECK
app.get("/", (req, res) => {
  res.send("✅ MedFinder Backend is running");
});

// ROUTES
app.use("/api/customer", require("./src/routes/customer"));
app.use("/api/verify-qr", require("./src/routes/verify"));
app.use("/api/shops", require("./src/routes/shops"));
app.use("/api/medicines", require("./src/routes/medicine"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
