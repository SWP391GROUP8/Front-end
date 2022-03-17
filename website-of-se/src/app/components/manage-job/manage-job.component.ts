import { WebRequestService } from './../../services/web-request.service';
import { ResourcePath } from './../../helper/resource-path';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobManagement } from './job.model';

@Component({
  selector: 'app-manage-job',
  templateUrl: './manage-job.component.html',
  styleUrls: ['./manage-job.component.scss'],
})
export class ManageJobComponent implements OnInit {
  isDisplay: boolean = false;
  listJob: JobManagement[] = [];
  jobId: string = null;
  
  constructor(
    private request: WebRequestService
    ) {}

  ngOnInit(): void {
    this.getListJob();
  }
  getListJob() {
    this.request.get(ResourcePath.JOB).subscribe(x => {
      this.listJob = x.body as JobManagement[];
      console.log(this.listJob);
      this.listJob.reverse();
    })
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
