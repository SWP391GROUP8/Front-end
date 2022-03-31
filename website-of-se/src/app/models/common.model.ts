
export interface Comment {
    userId: string;
    content: string;
    locationId: string;
}
export interface UserInfor {
    email?: string;
    name?: string;
    birthDay?: string;
    phone?: string;
    address?: string;
    status?: string;
    roleId?: string;
    password?: string;
}
export interface Role {
    id?: string;
    name?: string;
}
export interface Course {
    id: string;
    author: string;
    name: string;
    code: string;
    status: string;
}