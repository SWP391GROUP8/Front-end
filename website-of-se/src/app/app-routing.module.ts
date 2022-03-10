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
const routes: Routes = [
  { path: '', redirectTo: 'company', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'home', component: HomeComponent },

  {
    path: 'course',
    component: CourseComponent,
    children: [
      { path: '', component: ListCourseComponent },
      { path: ':id', component: CourseDetailComponent },
    ],
    data: { role: ['student','instructor'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'blog',
    component: ManageBlogComponent,
    children: [
      { path: '', component: ListBlogComponent },
      { path: ':id', component: BlogDetailsComponent },
    ],
    data: { role: ['student','instructor'] },
    canActivate: [AuthGuard],
  },
  { path: 'job', component: ManageJobComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    // data: { role: ['admin'] },
    // canActivate: [AuthGuard],
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./modules/company/company.module').then((m) => m.CompanyModule),
    // data: { role: ['admin'] },
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
