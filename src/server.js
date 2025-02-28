import express from 'express';
import cors from 'cors';
import { connectMongo } from "./connect.js";
import routes from "./routes.js";

const app = express(); // initialize express

// enable CORS - frontend<->backend communication - only from localhost:5173
app.use(cors({ origin: 'http://localhost:5173' }));
// add middleware for JSON payloads
app.use(express.json());
// API routes
app.use("/api", routes);

connectMongo();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
