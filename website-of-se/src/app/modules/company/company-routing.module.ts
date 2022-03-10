import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { ListCvComponent } from './list-cv/list-cv.component';
import { ManageJobComponent } from './manage-job/manage-job.component';

const routes: Routes = [{
  path: '',
  component: CompanyComponent,
  children: [
    {
      path: '',
      redirectTo: 'manage-job',
      pathMatch: 'full',
    },
    // {
    //   path: 'home',
    //   component: HomeComponent,
    // },
    {
      path: 'manage-job',
      component: ManageJobComponent,
    },
    {
      path: 'list-cv',
      component: ListCvComponent,
    },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  bootstrap: [CompanyComponent],
})
export class CompanyRoutingModule {}
