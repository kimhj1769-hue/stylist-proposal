import { Schema, model, Document } from 'mongoose';

export interface IClothingItem extends Document {
  name: string;
  category: 'Top' | 'Bottom' | 'Outer' | 'Shoes' | 'Accessory';
  color: string;
  season: ('Spring' | 'Summer' | 'Autumn' | 'Winter')[];
  imageUrl: string;
  userId: string; // 향후 사용자 인증을 위해 유지
  createdAt: Date;
}

const clothingItemSchema = new Schema<IClothingItem>({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Top', 'Bottom', 'Outer', 'Shoes', 'Accessory'] 
  },
  color: { type: String, required: true },
  season: { 
    type: [String], 
    required: true, 
    enum: ['Spring', 'Summer', 'Autumn', 'Winter'] 
  },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const ClothingItem = model<IClothingItem>('ClothingItem', clothingItemSchema);
