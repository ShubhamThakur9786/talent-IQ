import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";

const app = express();

const __dirname = path.resolve();

app.get("/health", (req, res) => {
  res.status(200).json({ mssg: "success from healt" });
});

//make our app ready for development

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log("Server is listning at port no.", ENV.PORT);
    });
  } catch (error) {
    console.log("💥error connecting the server");
  }
};

startServer();
