import express from "express";
import Home from "../controllers/home.js";
import Health from "../controllers/health.js";
import Login from "../controllers/login.js";
import Register from "../controllers/register.js";
import error404 from "../middlewares/error404.js";
import bikemanLogin from "../controllers/bikemanLogin.js";
import bikemanRegister from "../controllers/bikemanRegister.js";
import authMiddleware from "../middlewares/auth.js";
import getAllBikeMen from "../controllers/allBikemen.js";
const router = express.Router();

router.get("/", Home);
router.get("/health", Health);
router.post("/login", Login);
router.post("/register", Register);
router.post("/loginbikeman", bikemanLogin);
router.post("/registerbikeman", bikemanRegister);
router.get("/allBikeMen", authMiddleware, getAllBikeMen);

router.use(error404);
export default router;
