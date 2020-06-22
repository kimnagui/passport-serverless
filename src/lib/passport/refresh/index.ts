import { Router } from "express";

const router = Router();
router.get("/", (req, res, next) => {
  console.log("refresh token");
});

export default router;
