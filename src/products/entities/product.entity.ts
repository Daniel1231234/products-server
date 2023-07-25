import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Product {
    @Prop({ required: true, maxlength: 30 })
    name: string;

    @Prop({ required: false, maxlength: 200 })
    description: string;

    @Prop({ required: true, min: 0.01 })
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
