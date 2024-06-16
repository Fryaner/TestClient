import { UserModel } from "./userModel";

export interface RegisterModel {
    accessToken: string;
    refreshToken: string;
    message: string;
    user: UserModel;
}