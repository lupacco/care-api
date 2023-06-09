import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { handleApplicationErrors } from "./middlewares/errorsMiddleware.js";
dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(routes)
server.use(handleApplicationErrors)


const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

// 200: Ok => Significa que deu tudo certo com a requisição
// 201: Created => Sucesso na criação do recurso
// 301: Moved Permanently => Significa que o recurso que você está tentando acessar foi movido pra outra URL
// 401: Unauthorized => Significa que você não tem acesso a esse recurso
// 404: Not Found => Significa que o recurso pedido não existe
// 409: Conflict => Significa que o recurso que você está tentando inserir já foi inserido
// 422: Unprocessable Entity => Significa que a requisição enviada não está no formato esperado
// 500: Internal Server Error => Significa que ocorreu algum erro desconhecido no servidor