import express from 'express';
import LivrosRoutes from './routes/LivrosRoutes.js';
import UsuariosRoutes from './routes/UsuariosRoutes.js'; // importe suas rotas de usuários
import cors from 'cors';

const app = express();

// Usar CORS
app.use(cors());

// Usar JSON no corpo da requisição
app.use(express.json());

// Rotas para gerenciamento de livros e usuários
app.use('/api/livros', LivrosRoutes);
app.use('/api/usuarios', UsuariosRoutes); // rota para usuários

// Middleware para lidar com erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Rota padrão para 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(5000, () => {
  console.log('Servidor Express rodando na porta 5000');
});
