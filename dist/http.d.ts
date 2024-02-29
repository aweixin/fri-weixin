interface configType {
    baseUrl: string;
    url?: string;
    method: string;
    data: any;
    headers?: any;
    timeout?: number;
    responseType: string;
}
interface interceptorsType {
    request?: Function;
    response?: Function;
}
declare class Http {
    config: configType;
    interceptors: interceptorsType;
    constructor(_config: configType);
    request(options: configType): Promise<unknown>;
}
export default Http;
