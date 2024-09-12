// server.js
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import config from "./config/config.js";

// importing routes
import userRoutes from "./routes/userRoutes.js";
import typeRoutes from "./routes/typeRoutes.js";
import titleRoutes from "./routes/titleRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

const app = express();

// dotenv config
const PORT = config.port || 3001;

// database connection
connectDB();

// setting up middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting routes
// app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", userRoutes);
app.use("/api/types", typeRoutes);
app.use("/api/titles", titleRoutes);
app.use("/api/questions", questionRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on:- http://127.0.0.1:${PORT}/`);
});
