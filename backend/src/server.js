import express from "express";
import { ENV } from "./lib/env.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ mssg: "success from api" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ mssg: "success from healt" });
});

app.listen(ENV.PORT, () => {
  console.log("Server is listning at port no.", ENV.PORT);
});
