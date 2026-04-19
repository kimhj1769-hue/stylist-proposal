import { Request, Response } from 'express';
import { ClothingItem } from '../models/ClothingItem';

// 모든 옷 아이템 조회
export const getClothingItems = async (req: Request, res: Response) => {
  try {
    const items = await ClothingItem.find();
    res.status(200).json(items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// 새로운 옷 아이템 추가
export const createClothingItem = async (req: Request, res: Response) => {
  const { name, category, color, season, imageUrl, userId } = req.body;
  const newItem = new ClothingItem({ name, category, color, season, imageUrl, userId });

  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// 옷 아이템 삭제
export const deleteClothingItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ClothingItem.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
