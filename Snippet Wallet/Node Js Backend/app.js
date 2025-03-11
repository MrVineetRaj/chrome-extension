import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import "./src/appwrite.config.js";
import { dbServices } from "./src/appwrite.config.js";

import folderRouter from "./src/routes/folder.routes.js";
import snippetRouter from "./src/routes/snippets.routes.js";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ message: "Server is up and running", success: true });
});

app.use("/api/v1/folder", folderRouter);
app.use("/api/v1/snippet", snippetRouter);

app.listen(PORT, () => {
  console.log("Server is up on port", PORT);
});
