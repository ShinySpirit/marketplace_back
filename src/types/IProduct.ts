export interface IProduct {
    id: number,
    categoryId: number,
    title: string,
    description: string,
    price: number,
    mainImage: string,
    images: string[],
}