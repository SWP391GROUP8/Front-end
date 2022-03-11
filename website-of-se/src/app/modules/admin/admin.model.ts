export class Course {
    id: string;
    author: string;
    name: string;
    code: string;
    status: string;
}
export class Blog {
    id: string;
    title: string;
    content: string;
    status: string;
    reaction: number;
    author: string;
}
export class Account {
    email: string;
    birthDay: string;
    name: string;
    address: string;
    status: string;
    role: Role;
}
export class Role {
    id: string;
    name: string;
}