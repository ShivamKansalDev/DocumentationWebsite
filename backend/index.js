// server.js
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// dotenv config
const PORT = require("./config/config").default.port || 3001;

// database connection
connectDB();

// setting up middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting routes
// app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/types", require("./routes/typeRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on:- http://127.0.0.1:${PORT}/`);
});
