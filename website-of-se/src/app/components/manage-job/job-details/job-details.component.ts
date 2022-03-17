import { ResourcePath } from './../../../helper/resource-path';
import { WebRequestService } from './../../../services/web-request.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { JobManagement } from '../job.model';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  @Input() id: any;
  job: JobManagement;
  isLoading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private request: WebRequestService
    ) { }

  ngOnInit(): void {
    console.log('Details: ' + this.id);
    this.getJobDetails();
  }

  getJobDetails(){
    let params = new HttpParams()
    .set('id', this.id);
    this.request
      .getWithQuery(params,ResourcePath.JOB, ResourcePath.GET_BY_ID)
      .subscribe((x) => {
        if (x.status === 200) {
          console.log(x);
          this.job = x.body as JobManagement;
          console.log(this.job);
          this.isLoading = false;
        }
      });
  }

}
