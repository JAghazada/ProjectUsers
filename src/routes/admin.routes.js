import { Router } from "express";
import { Admin_PageController } from "../controllers/page.controllers.js";

const router = Router();

router.get("/admin",Admin_PageController)
export default router;