import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('categoryEntities')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number //ID

    @Column()
    title: string //Category title

    @Column()
    image: string //One image for one category
}