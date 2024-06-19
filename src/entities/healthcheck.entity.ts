import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('pingEntities')
export class PingEntity {   
    @PrimaryGeneratedColumn()
    id: number
}