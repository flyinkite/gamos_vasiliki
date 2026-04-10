import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://gamos-vasiliki.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/* Your existing routes */
app.use("/", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;