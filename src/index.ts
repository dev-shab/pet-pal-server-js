import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import mongoose from "mongoose";
import { MONGOOSE_CONNECTION_STRING, PORT } from "@/utils/config.js";
import userRouter from "@/routes/users.js";

const app = express();

app.use(express.json());

mongoose.connect(MONGOOSE_CONNECTION_STRING).then(() => {
  console.log("connected to DB");
});

app.use("/api/user/", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
