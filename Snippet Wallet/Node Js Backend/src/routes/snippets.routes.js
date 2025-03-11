import express from "express";
import {
  createSnippet,
  deleteSnippet,
  listAllSnippets,
  listOneSnippet,
  updateSnippet,
} from "../controllers/snippets.controller.js";

const router = express.Router();

router.post("/create", createSnippet);
router.get("/one", listOneSnippet);
router.get("/all", listAllSnippets);
router.put("/update", updateSnippet);
router.delete("/delete", deleteSnippet);

export default router;
