import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('productEntities')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    categoryId: number //Product category ID

    @Column()
    title: string //Product title

    @Column()
    description: string //Product description

    @Column()
    price: number //Product price

    @Column()
    mainImage: string //Main icon of product

    @Column("text", {array: true})
    images: string[] //List of product images

    
}