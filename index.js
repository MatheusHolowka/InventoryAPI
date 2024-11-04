// index.js
import express from 'express';
import inventoryRoutes from './routes/InventoryRoutes.js';
import cors from 'cors';

const app = express();

// Usar CORS
app.use(cors());

// Usar JSON no corpo da requisição
app.use(express.json());

// Rota para o cadastro de estoque
app.use('/inventory', inventoryRoutes);

app.listen(5000, () => { 
    console.log('Servidor Express rodando na porta 5000'); 
});
