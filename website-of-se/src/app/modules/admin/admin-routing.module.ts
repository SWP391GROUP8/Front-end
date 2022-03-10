import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { HomeComponent } from "./home/home.component";
import { ManageAccountComponent } from "./home/manage-account/manage-account.component";
import { ManageBlogComponent } from "./home/manage-blog/manage-blog.component";
import { ManageCourseComponent } from "./home/manage-course/manage-course.component";

const routes: Routes = [
    {
      path: '',
      component: AdminComponent,
      children: [
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full',
        },
        {
          path: 'home',
          component: HomeComponent,
        },
        {
          path: 'manage-course',
          component: ManageCourseComponent,
        },
        {
          path: 'manage-blog',
          component: ManageBlogComponent,
        },
        {
          path: 'manage-account',
          component: ManageAccountComponent,
        },


      ],
    },
  ];
  
  @NgModule({
    imports: [RouterModule
        .forChild(routes)],
    exports: [RouterModule],
    bootstrap: [AdminComponent],
  })
  export class AdminRoutingModule {}
  