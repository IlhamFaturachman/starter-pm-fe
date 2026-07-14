import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Server is running! :D -pram",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
