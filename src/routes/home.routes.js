import { Router } from "express";
import { Home_PageController } from "../controllers/page.controllers.js";

 const router  = Router();

router.get("/",Home_PageController)
export default router