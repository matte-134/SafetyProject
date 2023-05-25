import express from "express";
import userRoutes from "./users";
import auditRoutes from "./audits";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/audits", auditRoutes);

export default router;
