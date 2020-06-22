import { Router } from "express";

const router = Router();
router.get("/", (req, res, next) => {
  console.log("logout");
});

export default router;
