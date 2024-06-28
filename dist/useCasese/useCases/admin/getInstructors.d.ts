import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/userRepository";
export declare const getInstructors: (userRepository: IUserRepository, req: Req, next: Next) => Promise<{
    permitedNext: number;
    data: import("../../../entities/user").IUser[];
} | undefined>;
