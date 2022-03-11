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
export class NavigationLink {
  id: number;
  icon: string;
  name: string;
  link: string;
  isHightLight: boolean;
}
export class Schedule {
  content: string;
  courseId: string;
  createdBy: string;
  endTime: string;
  id: string;
  startTime: string;
  status: string;
  title: string;
}
