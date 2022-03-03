import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { ManageBlogComponent } from './components/manage-blog/manage-blog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

import { BlogDetailsComponent } from './components/manage-blog/blog-details/blog-details.component';
import { ListBlogComponent } from './components/manage-blog/list-blog/list-blog.component';
import { ManageJobComponent } from './components/manage-job/manage-job.component';
const routes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'blog',
    component: ManageBlogComponent,
    children: [
      { path: '', component: ListBlogComponent },
      { path: ':id', component: BlogDetailsComponent },
    ],
  },
  { path: 'job', component: ManageJobComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
