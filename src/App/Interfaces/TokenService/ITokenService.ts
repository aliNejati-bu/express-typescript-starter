export interface ITokenService {
    createToken(payload: any, secretKey: string, lifetime: number): Promise<string>;

    verifyToken<T>(token: string, secretKey: string): Promise<T | boolean>;
}