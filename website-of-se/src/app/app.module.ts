import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CodeInputModule } from 'angular-code-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { SidebarModule } from 'primeng/sidebar';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';

import { AppComponent } from './app.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './modules/admin/admin.component';
import { ManageBlogComponent } from './components/manage-blog/manage-blog.component';
import { BlogDetailsComponent } from './components/manage-blog/blog-details/blog-details.component';
import { ManageJobComponent } from './components/manage-job/manage-job.component';
import { ManageCvComponent } from './components/manage-job/manage-cv/manage-cv.component';
import { ListBlogComponent } from './components/manage-blog/list-blog/list-blog.component';
import { CommentComponent } from './components/comment/comment.component';
import { ChildboxComponent } from './components/comment/childbox/childbox.component';
import { CommentboxComponent } from './components/comment/commentbox/commentbox.component';
import { CommentsComponent, DatacontainerDirective } from './components/comment/comments/comments.component';
import { JobDetailsComponent } from './components/manage-job/job-details/job-details.component';
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
  DialogModule
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    ProfileComponent,
    AdminComponent,
    ManageBlogComponent,
    BlogDetailsComponent,
    ManageJobComponent,
    ManageCvComponent,
    ListBlogComponent,
    CommentComponent,
    ChildboxComponent,
    CommentboxComponent,
    CommentsComponent,
    DatacontainerDirective,
    JobDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    CodeInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...PRIMENG_MODULE,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
