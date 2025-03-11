import express from "express";
import {
  createFolder,
  deleteFolder,
  editFolder,
  listFolders,
} from "../controllers/folder.controller.js";
const router = express.Router();

router.get("/get", listFolders);
router.post("/add", createFolder);
router.put("/update", editFolder);
router.delete("/delete", deleteFolder);

export default router;
