import { IUser } from "../../../../entities/user";
export declare const getUsers: (role: string, pageNo: number) => Promise<{
    permitedNext: number;
    data: IUser[];
}>;
