import { Router } from "express";

export const router = Router();
import HomeRoutes from "./home.routes.js";
import AdminRoutes from "./admin.routes.js";
import UserRoutes from "./user.routes.js";
router.use(UserRoutes);
router.use(HomeRoutes);
router.use(AdminRoutes);