import { IsString, IsOptional, IsInt, IsPositive } from 'class-validator';

export class SearchProductsDto {
    @IsString()
    @IsOptional()
    query?: string;

    @IsString()
    @IsOptional()
    sortBy?: string;

    @IsString()
    @IsOptional()
    sortOrder?: 'asc' | 'desc';

    @IsInt()
    @IsPositive()
    @IsOptional()
    page?: number;

}
