
export interface SearchProductsDto {
    query?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}