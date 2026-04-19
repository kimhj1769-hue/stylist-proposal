import { Router } from 'express';
import { getClothingItems, createClothingItem, deleteClothingItem } from '../controllers/clothingController';

const router = Router();

router.get('/', getClothingItems);
router.post('/', createClothingItem);
router.delete('/:id', deleteClothingItem);

export default router;
