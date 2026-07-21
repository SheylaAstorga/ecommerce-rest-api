import { Router } from "express";
import { realizarCompra} from "../controllers/compras.controller.js";

const router = Router();

router.post("/", realizarCompra);

export default router;