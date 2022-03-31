import { CreateJobComponent } from './components/manage-job/create-job/create-job.component';
import { CreateBlogComponent } from './components/manage-blog/create-blog/create-blog.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CourseComponent } from './components/course/course.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ManageBlogComponent } from './components/manage-blog/manage-blog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

import { BlogDetailsComponent } from './components/manage-blog/blog-details/blog-details.component';
import { ListBlogComponent } from './components/manage-blog/list-blog/list-blog.component';
import { ManageJobComponent } from './components/manage-job/manage-job.component';
import { ListCourseComponent } from './components/course/list-course/list-course.component';
import { CourseDetailComponent } from './components/course/course-detail/course-detail.component';
import { NotAllowedComponent } from './components/not-allowed/not-allowed.component';
import { CourseQaDetailComponent } from './components/course/course-q/course-qa-detail/course-qa-detail.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
    data: { role: ['STUDENT', 'INSTRUCTOR'] },
    canActivate: [AuthGuard],
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { role: ['STUDENT', 'INSTRUCTOR', 'ADMIN', 'COMPANY'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { role: ['STUDENT', 'INSTRUCTOR', 'ADMIN', 'COMPANY'] },
    canActivate: [AuthGuard],
  },
  { path: 'createBlog', component: CreateBlogComponent },
  { path: 'createJob', component: CreateJobComponent },
  { path: 'test', component: CreateJobComponent },
  { path: 'not-allowed', component: NotAllowedComponent },

  {
    path: 'course',
    component: CourseComponent,
    children: [
      { path: '', component: ListCourseComponent },
      { path: ':id', component: CourseDetailComponent },
      {
        path: ':id/course-q&a/:qaID',
        component: CourseQaDetailComponent,
      },
    ],
    data: { role: ['STUDENT', 'INSTRUCTOR', 'ADMIN'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'blog',
    component: ManageBlogComponent,
    children: [
      { path: '', component: ListBlogComponent },
      { path: 'create', component: CreateBlogComponent },
      { path: ':id', component: BlogDetailsComponent },
    ],
    data: { role: ['STUDENT', 'INSTRUCTOR', 'ADMIN'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'job',
    component: ManageJobComponent,
    children: [
      { path: '', component: ManageJobComponent },
      { path: 'createJob', component: CreateJobComponent },
    ],
    data: { role: ['STUDENT', 'ADMIN', 'COMPANY'] },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    data: { role: ['ADMIN'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./modules/company/company.module').then((m) => m.CompanyModule),
    data: { role: ['COMPANY'] },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
