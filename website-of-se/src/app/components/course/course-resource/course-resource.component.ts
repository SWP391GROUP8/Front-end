import { StoreValueService } from './../../../services/store-value.service';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonObject } from 'src/app/helper/common-object';
import { ResourcePath } from 'src/app/helper/resource-path';
import { WebRequestService } from 'src/app/services/web-request.service';

@Component({
  selector: 'app-course-resource',
  templateUrl: './course-resource.component.html',
  styleUrls: ['./course-resource.component.scss'],
})
export class CourseResourceComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: any;
  courseResources: any[];
  selectedProducts: any[];
  courseId: string = null;
  fileToUpload: File | null = null;
  currentRole: any;
  constructor(
    private messageService: MessageService,
    private request: WebRequestService,
    private storeValue: StoreValueService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.currentRole = this.storeValue.getLocalStorage('role');
    this.getCourseResourse();
  }
  deleteSelectedProducts() {
    if (this.selectedProducts.length === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Thất bại',
        detail: 'Không có file để xóa!',
        life: 3000,
      });
    } else {
      this.selectedProducts.forEach((e) => {
        let params = new HttpParams().set('id', e.id);
        this.request.deleteWithQuery(params,ResourcePath.COURSE_RESOURCE).subscribe(x =>{
          if (x.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Xóa thành công file ' + e.file.name +'!',
              life: 3000,
            });
            this.getCourseResourse();
          }
        });
      });
    }
  }
  getCourseResourse() {
    let params = new HttpParams().set('id', this.courseId);
    this.request
      .getWithQuery(
        params,
        ResourcePath.COURSE_RESOURCE,
        ResourcePath.GET_BY_COURSE_ID
      )
      .subscribe((x) => {
        this.courseResources = x.body as any[];
      });
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
    this.request.post(formData, ResourcePath.FILE, 'upload').subscribe((x) => {
      if (x.status === 200) {
        const data = {
          content: 'testtttt',
          courseId: this.courseId,
          fileId: x.body['id'],
        };
        this.request.post(data, ResourcePath.COURSE_RESOURCE, ResourcePath.COURSE_RESOURCE_CREATE).subscribe((y) => {
          if (y.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Thêm tài liệu môn học thành công!',
              life: 3000,
            });
            this.getCourseResourse();
          }
        });
      }
    });
  }
}
