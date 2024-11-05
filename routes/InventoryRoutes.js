// routes/InventoryRoutes.js
import { Router } from "express";
import InventoryController from "../controllers/InventoryController.js";

const router = Router();

// CRUD
router.post('/', InventoryController.addInventoryItem); // create
router.get('/', InventoryController.getInventoryItems); // read all
router.put('/:id', InventoryController.updateInventoryItem); // update
router.delete('/:id', InventoryController.deleteInventoryItem); // delete


export default router;
