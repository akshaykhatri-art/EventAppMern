import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import mongoose from "mongoose";
import bodyParser from "body-parser";

// Routes
import authRoutes from "./routes/authRoutes.js";

app.use(bodyParser.json());
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Error connecting to MongoDB", err));
