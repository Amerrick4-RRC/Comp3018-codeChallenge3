import express, { Router } from "express";
import {
    getItems,
    createItem,
    updateItemWithId,
    deleteItemById,
    getHealth,
    getSelectedItem,
} from "../controllers/ItemController";
import { validateRequest } from "../middleware/validate";
import { ItemSchemas } from "../validation/ItemSchemas"


const router: Router = express.Router();

router.get("/items", getItems);
router.post("/items",validateRequest(ItemSchemas.create), createItem);
router.get("/items/:id",validateRequest(ItemSchemas.getById), getSelectedItem);
router.put("/items/:id",validateRequest(ItemSchemas.update), updateItemWithId);
router.delete("/items/:id",validateRequest(ItemSchemas.deleteById), deleteItemById);
router.get("/health", getHealth);

export default router;