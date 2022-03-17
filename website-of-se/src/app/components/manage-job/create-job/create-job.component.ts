import { ResourcePath } from 'src/app/helper/resource-path';
import { WebRequestService } from './../../../services/web-request.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { JobManagement } from './../job.model';
import { Component, OnInit } from '@angular/core';
import { add } from 'date-fns';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {
  listJob: JobManagement[] = [];
  newJobID: string;
  newJob: JobManagement;
  isInvalid: boolean = false;
  submitted: boolean = false;
  listStatus: any[] = [
    { id: 'Hiring', name: 'Đang tuyển dụng'},
    { id: 'Closed', name: 'Đã đóng đơn'},
  ];

  title: string;
  content: string;
  city: string;
  address: string;
  mail: string;
  phoneNumber: string;
  status: any;
  userId: string;
  


  constructor(
    private route: Router,
    private messageService: MessageService,
    private request: WebRequestService
  ) { }

  ngOnInit() {
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  submit() {
    this.submitted = true;
    console.log(this.isInvalid);
    this.newJobID = this.createId();
    this.newJob = {
      id: this.newJobID,
      title: this.title,
      content: this.content,
      city: this.city,
      address: this.address,
      mail: this.mail,
      phoneNumber: this.phoneNumber,
      status: this.status.id,
      userId: 'quanbt@fpt.edu.vn',
      createDate: null,
    };
    console.log(this.newJob);

    if (this.newJob != null) {
      this.request.post(this.newJob, ResourcePath.JOB).subscribe(x => {
        if (x.status === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Tạo công việc thành công!',
          });
          this.submitted = false;
          this.refresh();
          this.route.navigate(['/job']);
        }
        else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Tạo công việc không thành công!',
          });
        }
      })
    }
  }

  refresh() {
    this.title = null;
    this.content = null;
    this.city = null;
    this.address = null;
    this.mail = null;
    this.phoneNumber = null;
    this.status = null;
    this.userId = null;
  }

}
