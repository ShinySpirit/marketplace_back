export interface IUser {
    id: number,
    login: string,
    password: string,
    role: string,
    email: string,
    name: string,
    lastname: string,
    phone: string,
    adressRegion: string
    adressDistrict: string,
    adressStreet: string,
    adressBulilding: string,
    adressFlat: string,
    favorites: number[]
}