import {crearCompra} from "../services/compras.service.js";

export const realizarCompra = async (req, res,next) => {
    try {
        const compra = await crearCompra(req.body);
        res.status(201).json(compra);
    } catch (error) {
        next(error)
    }
}

