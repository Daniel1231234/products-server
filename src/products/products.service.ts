import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "./entities/product.entity";
import { Model } from "mongoose";
import { SearchProductsDto } from "./dto/search-product.dto";

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name)
    private ITEMS_PER_PAGE = 5

    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>
    ) { }

    async getTotalPageCount(): Promise<number> {
        try {
            const products = await this.productModel.find().exec()
            const totalPageCount = Math.ceil(products.length / this.ITEMS_PER_PAGE)
            return totalPageCount
        } catch (error) {
            this.logger.error('Failed to get products length', error);
            throw error;
        }
    }

    async getAllProducts({ query = "", sortBy = 'name', sortOrder = 'asc', page = 1 }: SearchProductsDto): Promise<Product[]> {
        try {
            const conditions = query
                ? {
                    $or: [
                        { name: { $regex: new RegExp(query, 'i') } },
                        { description: { $regex: new RegExp(query, 'i') } },
                    ],
                }
                : {};

            const skip = (page - 1) * this.ITEMS_PER_PAGE

            return await this.productModel
                .find(conditions)
                .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
                .skip(skip)
                .limit(this.ITEMS_PER_PAGE)
                .exec();
        } catch (error) {
            this.logger.error('Failed to search products', error);
            throw error;
        }
    }

    async getProduct(productId: string): Promise<Product> {
        try {
            return await this.productModel.findById(productId).exec();
        } catch (error) {
            this.logger.error('Failed to get product', error);
            throw error;
        }
    }

    async createProduct(product: Product): Promise<Product> {
        try {
            const newProduct = new this.productModel(product)
            newProduct.createdAt = Date.now()
            return await newProduct.save();
        } catch (error) {
            this.logger.error('Failed to create product', error);
            throw error;
        }
    }

    async updateProduct(productId: string, updatedProduct: Product): Promise<Product> {
        try {
            return await this.productModel.findByIdAndUpdate(productId, updatedProduct, { new: true }).exec();
        } catch (error) {
            this.logger.error('Failed to update product', error);
            throw error;
        }
    }

    async deleteProduct(productId: string): Promise<any> {
        try {
            return await this.productModel.findByIdAndRemove(productId).exec();
        } catch (error) {
            this.logger.error('Failed to delete product', error);
            throw error;
        }
    }


}
