export interface IResponse<T> {
    status_code: number;
    detail: string;
    result: T;
}