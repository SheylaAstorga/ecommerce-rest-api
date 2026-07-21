import "dotenv/config";
import express from "express";
import usuariosRoutes from "./routes/usuarios.routes.js";
import categoriasRoutes from "./routes/categorias.routes.js";
import productosRoutes from "./routes/productos.routes.js"; 
import pedidosRoutes from "./routes/pedidos.routes.js";
import detallePedidoRoutes from "./routes/detalle_pedido.routes.js";
import comprasRoutes from "./routes/compras.routes.js";
import {manejarError} from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.routes.js"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";



const app = express();
app.use(express.json());

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))


// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    mensaje: "Hola Shey, esta es mi primera API :3",
  });
});

// Rutas de usuarios
app.use("/usuarios", usuariosRoutes);
// Rutas de categorias
app.use("/categorias", categoriasRoutes);

// Rutas de productos
app.use("/productos", productosRoutes);

// Rutas de pedidos
app.use("/pedidos", pedidosRoutes);

// Rutas de detalle de pedidos
app.use("/detalle_pedido", detallePedidoRoutes);

// Rutas de compras
app.use("/compras", comprasRoutes);

//Rutas de autentificación
app.use("/auth",authRoutes);


app.use(manejarError); // Middleware de manejo de errores


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
