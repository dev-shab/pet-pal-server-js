import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import mongoose from "mongoose";
import { MONGOOSE_CONNECTION_STRING, PORT } from "@/utils/config.js";
import userRouter from "@/routes/users.js";
import { setupSwagger } from "@/utils/swagger.js";
import ApiError from "@/utils/ApiError.js";

const app = express();
app.use(express.json());

setupSwagger(app);

mongoose.connect(MONGOOSE_CONNECTION_STRING).then(() => {
  console.log("connected to DB");
});

app.use("/api/v1/user/", userRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
