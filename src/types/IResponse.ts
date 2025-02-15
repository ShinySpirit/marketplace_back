export interface IResponse<T> {
    statusCode: number,
    message: string,
    result: T,
}