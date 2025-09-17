import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.status(200).send("Hello from PET PAL");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
