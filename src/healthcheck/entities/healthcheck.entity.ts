import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ping_entities')
export class PingEntity {   
    @PrimaryGeneratedColumn()
    id: number
}