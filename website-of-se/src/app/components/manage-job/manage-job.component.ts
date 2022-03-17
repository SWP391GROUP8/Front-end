import { WebRequestService } from './../../services/web-request.service';
import { ResourcePath } from './../../helper/resource-path';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JobManagement } from './job.model';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-manage-job',
  templateUrl: './manage-job.component.html',
  styleUrls: ['./manage-job.component.scss'],
})
export class ManageJobComponent implements OnInit {
  isDisplay: boolean = false;
  listJob: JobManagement[] = [];
  jobId: string = null;
  @ViewChild('menuItems') menu: MenuItem[];
  items: MenuItem[];
  activeItem: MenuItem;
  constructor(
    private request: WebRequestService
    ) {}

  ngOnInit(): void {
    this.getListJob();
    this.items = [
      { id: '1', label: 'Công việc' },
      { id: '2', label: 'Quản lý CV' },
    ];
    this.activeItem = this.items[0];
  }
  getListJob() {
    this.request.get(ResourcePath.JOB).subscribe(x => {
      this.listJob = x.body as JobManagement[];
      console.log(this.listJob);
      this.listJob.reverse();
    })
  }
  activateMenu() {
    this.activeItem = this.menu['activeItem'];
  }
  openJobDetail(id) {
    // console.log(id);
    this.jobId = id;
    this.isDisplay = true;
  }

  onHide(){
    this.jobId = null;
    this.isDisplay = false;
  }
}
