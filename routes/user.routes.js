import { Router } from "express";
import { AddUserController, SearchUserController } from "../controllers/user.controllers.js";

const router= Router();

router.post("/add-user",AddUserController);
router.get("/user/search",SearchUserController)


export default router
