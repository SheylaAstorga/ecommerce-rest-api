import swaggerJSDoc from "swagger-jsdoc";
import "dotenv/config";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API E-commerce",
      version: "1.0.0",
      description: "API REST desarrollada con Node.js, Express y PostgreSQL",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://ecommerce-rest-api-1-o4qg.onrender.com"
            : "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        Usuario: {
          type: "object",
          required: ["id", "nombre", "apellido", "email", "telefono", "rol"],
          properties: {
            id: {
              type: "integer",
              example: 8,
            },
            nombre: {
              type: "string",
              example: "Prueba",
            },
            apellido: {
              type: "string",
              example: "Login",
            },
            email: {
              type: "string",
              example: "prueba.login@gmail.com",
            },
            telefono: {
              type: "string",
              example: "3815550000",
            },
            rol: {
              type: "string",
              example: "admin",
            },
          },
        },

        UsuarioRegistro: {
          type: "object",
          required: ["nombre", "apellido", "email", "telefono", "password"],
          properties: {
            nombre: {
              type: "string",
              example: "Sheyla",
            },
            apellido: {
              type: "string",
              example: "Astorga",
            },
            email: {
              type: "string",
              example: "sheyla@gmail.com",
            },
            telefono: {
              type: "string",
              example: "3815555555",
            },
            password: {
              type: "string",
              example: "123456",
            },
          },
        },

        Producto: {
          type: "object",
          required: ["nombre", "precio", "stock", "categoria_id"],
          properties: {
            id: {
              type: "integer",
              example: 15,
            },
            nombre: {
              type: "string",
              example: "Mouse Gamer RGB",
            },
            descripcion: {
              type: "string",
              example: "Mouse inalámbrico RGB",
            },
            precio: {
              type: "number",
              example: 32000,
            },
            stock: {
              type: "integer",
              example: 12,
            },
            categoria_id: {
              type: "integer",
              example: 2,
            },
          },
        },
        ProductoCrear: {
          type: "object",
          required: ["nombre", "precio", "stock", "categoria_id"],
          properties: {
            nombre: {
              type: "string",
              example: "Mouse Gamer RGB",
            },
            descripcion: {
              type: "string",
              example: "Mouse inalámbrico RGB",
            },
            precio: {
              type: "number",
              example: 32000,
            },
            stock: {
              type: "integer",
              example: 12,
            },
            categoria_id: {
              type: "integer",
              example: 2,
            },
          },
        },
        LoginUsuario: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "prueba.login@gmail.com",
            },
            password: {
              type: "string",
              example: "123456",
            },
          },
        },
        Categoria: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 2,
            },
            nombre: {
              type: "string",
              example: "Periféricos",
            },
            descripcion: {
              type: "string",
              example: "Productos para computadoras",
            },
          },
        },
        CategoriaCrear: {
          type: "object",
          required: ["nombre", "descripcion"],
          properties: {
            nombre: {
              type: "string",
              example: "Periféricos",
            },
            descripcion: {
              type: "string",
              example: "Productos para computadoras",
            },
          },
        },
        Pedido: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 15,
            },
            usuario_id: {
              type: "integer",
              example: 8,
            },
            fecha: {
              type: "string",
              format: "date-time",
              example: "2026-07-20T22:58:52.543Z",
            },
            estado: {
              type: "string",
              example: "pendiente",
            },
            total: {
              type: "number",
              example: 50000,
            },
          },
        },
        PedidoCrear: {
          type: "object",
          required: ["usuario_id", "estado", "productos"],
          properties: {
            usuario_id: {
              type: "integer",
              example: 8,
            },
            estado: {
              type: "string",
              example: "pendiente",
            },
            productos: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  producto_id: {
                    type: "integer",
                    example: 15,
                  },
                  cantidad: {
                    type: "integer",
                    example: 2,
                  },
                },
              },
            },
          },
        },
        PedidoActualizar: {
          type: "object",
          required: ["usuario_id", "fecha", "total", "estado"],
          properties: {
            usuario_id: {
              type: "integer",
              example: 8,
            },
            fecha: {
              type: "string",
              example: "2026-07-20",
            },
            total: {
              type: "number",
              example: 50000,
            },
            estado: {
              type: "string",
              example: "enviado",
            },
          },
        },
        DetallePedido: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            pedido_id: {
              type: "integer",
              example: 15,
            },
            producto_id: {
              type: "integer",
              example: 15,
            },
            cantidad: {
              type: "integer",
              example: 2,
            },
            precio_unitario: {
              type: "number",
              example: 25000,
            },
          },
        },
        DetallePedidoCrear: {
          type: "object",
          required: ["pedido_id", "producto_id", "cantidad", "precio_unitario"],
          properties: {
            pedido_id: {
              type: "integer",
              example: 15,
            },
            producto_id: {
              type: "integer",
              example: 15,
            },
            cantidad: {
              type: "integer",
              example: 2,
            },
            precio_unitario: {
              type: "number",
              example: 25000,
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
