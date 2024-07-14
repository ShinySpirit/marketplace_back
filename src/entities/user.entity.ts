import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('userEntityes')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    login: string

    @Column()
    password: string

    @Column({ unique: true })
    email: string

    @Column()
    role: string

    @Column({ nullable: true })
    name: string

    @Column({ nullable: true })
    lastname: string

    @Column({ nullable: true, unique: true })
    phone: string

    @Column({ nullable: true })
    adressRegion: string

    @Column({ nullable: true })
    adressDistrict: string

    @Column({ nullable: true })
    adressStreet: string

    @Column({ nullable: true })
    adressBulilding: string

    @Column({ nullable: true })
    adressFlat: string

    @Column("int", {array: true, nullable: true })
    favorites: number[]
}
