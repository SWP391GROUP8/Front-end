import { HttpParams } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourcePath } from 'src/app/helper/resource-path';
import { WebRequestService } from 'src/app/services/web-request.service';

@Component({
  selector: 'app-course-qa-detail',
  templateUrl: './course-qa-detail.component.html',
  styleUrls: ['./course-qa-detail.component.scss'],
})
export class CourseQaDetailComponent implements OnInit {
  qa: any;
  id: string;
  courseId: string;
  isLoading: boolean = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private route: Router,
    private request: WebRequestService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.id = this.activeRoute.snapshot.paramMap.get('qaID');
    this.getQADetail();
  }
  getQADetail(){
    let params = new HttpParams().set('id',this.id);
    this.request.getWithQuery(params,ResourcePath.COURSE_QA, ResourcePath.GET_BY_ID).subscribe(x => {
      console.log(x);
      this.qa = x.body;
      this.isLoading = false;
    });
  }
}
