export interface IResponseSuccess {
    message: string;
    data: any[];
    statusCode: number;
}

export interface IResponseFailed {
    errorMessage: string;
    error: any;
    statusCode: number;
}