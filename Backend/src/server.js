import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";

const app = express();

const __dirname = path.resolve();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hey! from server h" });
});
app.get("/health", (req, res) => {
  res.status(200).json({ message: "This is health end-point" });
});
app.get("/books", (req, res) => {
  res.status(200).json({ message: "This is books end-point" });
});

if (ENV.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log("Server is up and running on prot NO.", ENV.PORT);
    });
  } catch (error) {
    console.error("💥 Error connecting to Server", error);
  }
};

startServer();
