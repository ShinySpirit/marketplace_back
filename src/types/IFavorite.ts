import { IProduct } from "./IProduct";

export interface IFavorite extends IProduct {
    userId: number
}