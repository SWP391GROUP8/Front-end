import { StoreValueService } from './../../services/store-value.service';
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
  isLoading: boolean = false;
  listJob: JobManagement[] = [];
  jobId: string = null;
  currentRole: any;
  @ViewChild('menuItems') menu: MenuItem[];
  items: MenuItem[];
  activeItem: MenuItem;
  constructor(
    private request: WebRequestService,
    private storeValue: StoreValueService,
    ) {}

  ngOnInit(): void {
    
    this.currentRole = this.storeValue.getLocalStorage('role');
    this.isLoading = true;
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
      this.listJob.reverse();
      this.isLoading = false;
    })
  }
  activateMenu() {
    this.activeItem = this.menu['activeItem'];
  }
  openJobDetail(id) {
    this.jobId = id;
    this.isDisplay = true;
  }

  onHide(){
    this.jobId = null;
    this.isDisplay = false;
  }
}
