export interface IPasswordService {
    /**
     * generate hashed password
     * @param password
     */
    hash(password: string): Promise<string>;

    /**
     * verify hashed password
     * @param password
     * @param hash
     */
    verify(password: string, hash: string): Promise<boolean>;


}