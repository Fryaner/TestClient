export interface UserModel {
    id?: number,
    lastName?: string,
    firstName?: string,
    patronymic?: string,
    phone?: string,
    login?: string,
    email?: string, 
    password?: string,
    isActivated?: boolean,
    createdAt?: string,
    message?: string,
    newPassword?: string,
}