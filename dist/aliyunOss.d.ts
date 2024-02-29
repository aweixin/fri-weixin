interface ossAuthInfoType {
    accessKeyId: string;
    accessKeySecret: string;
    bucket?: string;
    endpoint: string;
    filePath: string;
    host: string;
    region: string;
    stsToken: string;
}
/**
 * 上传文件到阿里云OSS
 * @param filePath 文件路径
 * @param OssAuthInfo 阿里云OSS认证信息
 * @param fileName 文件名
 * @returns Promise<string>
 * @example aliyunOss("filePath",  OssAuthInfo)
 */
export declare const aliyunOss: (filePath: string, OssAuthInfo: ossAuthInfoType, fileName?: string) => Promise<string>;
export {};
