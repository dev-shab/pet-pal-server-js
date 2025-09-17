import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.MONGOOSE_CONNECTION_STRING) {
  mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING).then(() => {
    console.log("connected to DB");
  });
}

app.get("/", (req, res) => {
  return res.status(200).send("Hello from PET PAL");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
