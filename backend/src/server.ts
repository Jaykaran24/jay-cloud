import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/jaycloud";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("[DB] Connected to MongoDB:", MONGO_URI);
    app.listen(PORT, () => {
      console.log(`[API] Jay Cloud backend running on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("[DB] MongoDB connection failed:", err.message);
    process.exit(1);
  });
