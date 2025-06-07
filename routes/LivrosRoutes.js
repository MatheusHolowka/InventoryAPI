import { Router } from 'express';
import LivrosController from '../controllers/LivrosController.js';

const router = Router();

router.get('/', LivrosController.getLivros); // deve aceitar ?page= e ?limit=
router.get('/:id', LivrosController.getLivro);
router.post('/', LivrosController.addLivro);
router.put('/:id', LivrosController.updateLivro);
router.delete('/:id', LivrosController.deleteLivro);

export default router;
