import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ResourcePath } from 'src/app/helper/resource-path';
import { Course } from 'src/app/models/common.model';
import { WebRequestService } from 'src/app/services/web-request.service';

@Component({
  selector: 'app-course-q',
  templateUrl: './course-q.component.html',
  styleUrls: ['./course-q.component.scss']
})
export class CourseQComponent implements OnInit {
  title: string;
  content: string;
  courseId: string;
  isDisplay: boolean = false;
  listQA: any[];
  selectedProducts: any[];
  constructor(
    private route: Router,
    private messageService: MessageService,
    private request: WebRequestService,
    private active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.courseId = this.active.snapshot.paramMap.get('id') ?? null;
    this.getListQA();
  }
  showDialog() {
    this.isDisplay = true;
  }
  addQA() {
    if (this.title != null && this.content != null) {
      const data = { 
        content: this.content,
        courseId: this.courseId,
        title: this.title
      };
      this.request.post(data, ResourcePath.COURSE_QA, ResourcePath.COURSE_QA_CREATE).subscribe(x => {
        if (x.status === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Tạo bài viết thành công!',
          });
          this.refresh();
          this.route.navigate(['/course']);
        }
        else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Tạo bài viết không thành công!',
          });
        }
      })
    }
  }
  getListQA() {
    let params = new HttpParams().set('id', this.courseId);
    this.request.getWithQuery(params, ResourcePath.COURSE_QA, ResourcePath.GET_BY_COURSE_ID).subscribe(x => {
      if (x.status === 200) {
        this.listQA = x.body as any[];
      }
    })
  }
  viewDetailQA(id) {
    this.route.navigate([
      `/course/${this.courseId}/course-q&a`,
      id,
    ]);
  }
  refresh() {
    this.title = null;
    this.content = null;
  }
}