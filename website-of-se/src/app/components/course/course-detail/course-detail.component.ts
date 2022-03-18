import { Course } from './../../../models/common.model';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ResourcePath } from 'src/app/helper/resource-path';
import { StoreValueService } from 'src/app/services/store-value.service';
import { WebRequestService } from 'src/app/services/web-request.service';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  role: string;
  courseDetail: Course = { id: '', author: '', code: '', name: '', status: '' };
  id: string;
  constructor(
    private request: WebRequestService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCourseById();
  }
  addEvent(){
    
  }
  getCourseById() {
    let params = new HttpParams()
    .set('id', this.id);
    this.request
      .getWithQuery(params,ResourcePath.COURSE, ResourcePath.GET_BY_ID)
      .subscribe((x) => {
        if (x.status === 200) {
          this.courseDetail = x.body as Course;
        }
      });
  }

}
