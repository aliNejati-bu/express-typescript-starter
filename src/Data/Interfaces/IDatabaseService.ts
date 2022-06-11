import {IUserRepository} from "./Repositories/IUserRepository";

export interface IDatabaseService {
    connect(): Promise<void>;

    userRepository: IUserRepository;
}