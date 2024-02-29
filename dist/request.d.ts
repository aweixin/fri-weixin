interface returnType {
    code: number;
    data: any;
    msg: string;
    message: string;
}
/**
 * @param url 请求地址
 * @param data 请求数据
 * @param header 请求头
 * @returns Promise<returnType>
 * @description 发送POST请求
 */
export declare const post: (url: string, data: any, header?: Object) => Promise<returnType>;
/**
 * @param url 请求地址
 * @param data 请求数据
 * @param header 请求头
 * @returns Promise<returnType>
 * @description 发送GET请求
 */
export declare const get: (url: string, data: any, header?: Object) => Promise<returnType>;
export declare const put: (url: string, data: any, header?: Object) => Promise<returnType>;
export declare const del: (url: string, data: any, header?: Object) => Promise<returnType>;
export declare const options: (url: string, data: any, header?: Object) => Promise<returnType>;
export declare const head: (url: string, data: any, header?: Object) => Promise<returnType>;
export declare const trace: (url: string, data: any, header?: Object) => Promise<returnType>;
export declare const connect: (url: string, data: any, header?: Object) => Promise<returnType>;
export {};
