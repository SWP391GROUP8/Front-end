import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TabMenuModule } from 'primeng/tabmenu';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ManageJobComponent } from './manage-job/manage-job.component';
import { ListCvComponent } from './list-cv/list-cv.component';

const PRIMENG_MODULE = [
  PasswordModule,
  InputTextModule,
  ButtonModule,
  CheckboxModule,
  MultiSelectModule,
  TabViewModule,
  RadioButtonModule,
  DropdownModule,
  InputTextareaModule,
  TooltipModule,
  ToastModule,
  DividerModule,
  CalendarModule,
  SidebarModule,
  MessagesModule,
  ConfirmDialogModule,
  FileUploadModule,
  DialogModule,
  MenuModule,
  RippleModule,
  TabMenuModule,
  OverlayPanelModule,
  BadgeModule,
  ToolbarModule,
  TableModule
];
@NgModule({
  declarations: [
    ManageJobComponent,
    ListCvComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    RouterModule,
    FormsModule,
    ...PRIMENG_MODULE
  ]
})
export class CompanyModule { }
