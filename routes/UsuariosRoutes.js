import { Router } from "express";
import UsuariosController from "../controllers/UsuarioController.js";


const router = Router();

// Rotas para Usuários - prefixo /usuarios
router.post('/', UsuariosController.createUsuario); // Cria usuário
router.get('/:id', UsuariosController.getUsuarioById); // Obter usuário por ID
router.get('/', UsuariosController.getUsuarios); // Lista todos os usuários
router.put('/:id', UsuariosController.updateUsuario); // Atualiza usuário
router.delete('/:id', UsuariosController.deleteUsuario); // Deleta usuário


export default router;