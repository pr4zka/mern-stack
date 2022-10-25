import { Router } from "express";
const router = Router();
import postControllers from "../controllers/postControllers.js";

router.get("/post", postControllers.getPost);
router.get("/post/:id", postControllers.getById);
router.post("/post",postControllers.createPost);
router.put("/post/:id", postControllers.updatePost);
router.delete("/post/:id", postControllers.deletePost);

export default router;
