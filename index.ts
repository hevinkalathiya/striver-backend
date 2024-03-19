// src/app.ts
import express from "express";
import cors from "cors";
import router from "./Routes/codeRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

const allowedOrigins: string[] = [
  "http://localhost:3000",
  "https://striver-hire-me.vercel.app",
];
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

// Routes
app.use("/api/code", router);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
