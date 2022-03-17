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
  submitted: boolean = false;
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
  }
  showDialog() {
    this.isDisplay = true;
  }
  submit() {
    this.submitted = true;
    if (this.title != null && this.content != null) {
      const data = { 
        content: this.content,
        courseId: this.courseId,
        title: this.title
      };
      this.request.post(data, ResourcePath.COURSE).subscribe(x => {
        if (x.status === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Tạo bài viết thành công!',
          });
          this.submitted = false;
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

  refresh() {
    this.title = null;
    this.content = null;
  }
}