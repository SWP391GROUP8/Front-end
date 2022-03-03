import { Course } from './../../../models/common.model';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ResourcePath } from 'src/app/helper/resource-path';
import { StoreValueService } from 'src/app/services/store-value.service';
import { WebRequestService } from 'src/app/services/web-request.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  courseDetail: Course;
  id: string;
  // email: string = this.storeValue.getLocalStorage('email') ?? null;
  constructor(
    private storeValue: StoreValueService,
    private request: WebRequestService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCourseById(this.id);
  }

  getCourseById(id: string) {
    this.request
      .get(ResourcePath.COURSE, ResourcePath.GET_BY_ID, id)
      .subscribe((x) => {
        if (x.status === 200) {
          // this.courseDetail = x.body;
        }
      });
  }

}
