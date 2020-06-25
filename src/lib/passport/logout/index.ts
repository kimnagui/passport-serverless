import { Router } from "express";

const { LOGOUT_REDIRECT_URL = "/" } = process.env;

const router = Router();
router.get("/", (req, res) => {
  req.logout();
  res.clearCookie("token");
  res.redirect(LOGOUT_REDIRECT_URL);
});

export default router;
