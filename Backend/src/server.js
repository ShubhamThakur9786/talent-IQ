import express from "express";
import { ENV } from "./lib/env.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hey! from server h" });
});

app.listen(ENV.PORT, () => {
  console.log("Server is up and running on prot NO.", ENV.PORT);
});
