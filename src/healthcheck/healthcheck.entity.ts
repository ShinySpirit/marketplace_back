import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class pingEntity {   
    @PrimaryGeneratedColumn()
    id: number
}