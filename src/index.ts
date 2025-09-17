import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.status(200).send("Hello from PET PAL");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
