import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonObject } from 'src/app/helper/common-object';
import { ResourcePath } from 'src/app/helper/resource-path';
import { WebRequestService } from 'src/app/services/web-request.service';

@Component({
  selector: 'app-course-resource',
  templateUrl: './course-resource.component.html',
  styleUrls: ['./course-resource.component.scss']
})
export class CourseResourceComponent implements OnInit {
  
  @ViewChild('fileUpload') fileUpload: any;
  courseResources: any[];
  selectedProducts: any[];
  courseId: string = null;
  fileToUpload: File | null = null;
  constructor(private messageService: MessageService, private request: WebRequestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
  }
  getCourseResourse() {
    
  }
  onUpload(event) {
    this.fileToUpload = event.currentFiles[0];
    this.postFile(this.fileToUpload);
    this.fileUpload.clear();
  }

  postFile(postedFile) {
    // Update content of upload button
    const formData = new FormData();
    formData.append('file', postedFile);
    this.request.post(formData, ResourcePath.FILE,'upload').subscribe(x => {
      if (x.status === 200) {
        const data = {
          content: "testtttt",
          courseId: this.courseId,
          fileId: x.body['id']
        };
        this.request.post(data, ResourcePath.COURSE_RESOURCE).subscribe(y => {
          if (y.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Thêm tài liệu môn học thành công!',
              life: 3000,
            });
            this.getCourseResourse();
          }
        })
      }
    });
  }
}
