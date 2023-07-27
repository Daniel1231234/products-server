import { Controller, Get, Post, Put, Delete, Body, Param, Req, Res, HttpException, HttpStatus, UsePipes, ValidationPipe } from "@nestjs/common";
import { Product } from "./entities/product.entity";
import { ProductService } from "./products.service";


@Controller("product")
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Get()
    @UsePipes(new ValidationPipe())
    async GetAllProducts(@Req() req: any, @Res() res: any): Promise<Product[]> {
        try {
            const products = await this.productService.getAllProducts(req.query);
            return res.status(HttpStatus.OK).json(products);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get("/length")
    async GetTotalPageCount(@Req() req: any, @Res() res: any): Promise<number> {
        try {
            const totalPages = await this.productService.getTotalPageCount()
            return res.status(HttpStatus.OK).json(totalPages)
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getProduct(@Res() res: any, @Param('id') id: string): Promise<Product> {
        try {
            const product = await this.productService.getProduct(id);
            return res.status(HttpStatus.OK).json(product);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async createProduct(@Res() res: any, @Body() product: Product): Promise<Product> {
        try {
            const newProduct = await this.productService.createProduct(product);
            return res.status(HttpStatus.CREATED).json({
                message: "Product has been submitted successfully!",
                product: newProduct,
            });
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async updateProduct(@Res() res: any, @Param('id') id: string, @Body() product: Product): Promise<Product> {
        try {
            const updatedProduct = await this.productService.updateProduct(id, product);
            return res.status(HttpStatus.OK).json({
                message: "Product updated successfully!",
                product: updatedProduct
            });
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async deleteProduct(@Res() res: any, @Param('id') id: string): Promise<any> {
        try {
            await this.productService.deleteProduct(id);
            return res.status(HttpStatus.OK).json({
                message: "Product has been deleted successfully!",
                id: id,
            });
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
