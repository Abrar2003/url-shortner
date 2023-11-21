import express, { Application, Request, Response } from "express";
import connectDB from "./config/connectDB";
import cors from "cors";
const dotenv = require("dotenv");
import urlRouter from "./routes/url.route";
import analyticsRouter from "./routes/analytics.route";

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "8000", 10);

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/", urlRouter);
app.use("/analytics", analyticsRouter);

app.get("/", (req: Request, res: Response) => {
  const ip: string = req.ip || "unknown";
  res.send({ message: `Hello, ${ip}` });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server started on port ${PORT}`);
});
export default app
