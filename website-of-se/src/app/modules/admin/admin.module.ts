import { ListBlogComponent } from './home/manage-blog/list-blog/list-blog.component';
import { ListAccountComponent } from './home/manage-account/list-account/list-account.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import {ToolbarModule} from 'primeng/toolbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BadgeModule } from 'primeng/badge';
import { TabMenuModule } from 'primeng/tabmenu';
import { HeaderComponent } from './home/header/header.component';
import { ManageAccountComponent } from './home/manage-account/manage-account.component';
import { ManageCourseComponent } from './home/manage-course/manage-course.component';
import { ManageBlogComponent } from './home/manage-blog/manage-blog.component';
import { RouterModule } from '@angular/router';
import { ListCourseComponent } from './home/manage-course/list-course/list-course.component';
import { ListEventComponent } from './home/manage-course/list-event/list-event.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

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
    HomeComponent,
    HeaderComponent,
    ManageAccountComponent,
    ManageCourseComponent,
    ManageBlogComponent,
    ListCourseComponent,
    ListEventComponent,
    ListBlogComponent,
    ListAccountComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule,
    ...PRIMENG_MODULE
  ]
})
export class AdminModule { }
