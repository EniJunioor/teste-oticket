import express from "express";
import cors from "cors";
import clienteRoutes from "./routes/clienteRoutes.js";
import produtoRoutes from "./routes/produtoRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";
import { swaggerUi, specs } from "./config/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/clientes", clienteRoutes);
app.use("/produtos", produtoRoutes);
app.use("/pedidos", pedidoRoutes);

app.get("/", (req, res) => {
  res.send("Backend API Mini Sistema de Pedidos está no ar! Acesse /api-docs para ver a documentação.");
});

export default app;
