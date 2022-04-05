import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ResourcePath } from 'src/app/helper/resource-path';
import { WebRequestService } from 'src/app/services/web-request.service';

import { StoreValueService } from 'src/app/services/store-value.service';

@Component({
  selector: 'app-manage-cv',
  templateUrl: './manage-cv.component.html',
  styleUrls: ['./manage-cv.component.scss'],
})
export class ManageCvComponent implements OnInit {
  listCV: any[] = [];
  isLoading:boolean = false;
  email: string;
  @ViewChild('fileUpload') fileUpload: any;
  fileToUpload: File | null = null;
  constructor(
    private request: WebRequestService,
    private messageService: MessageService,
    private sValue: StoreValueService
  ) {}
  file: any;
  ngOnInit(): void {
    this.isLoading = true;
    this.email = this.sValue.getLocalStorage('email') ?? null;
    this.getFile();
  }
  getFile() {
    let params = new HttpParams().set('email', this.email);
    this.request
      .getWithQuery(params, ResourcePath.FILE, ResourcePath.GET_BY_USER_ID)
      .subscribe(x => {
        this.listCV = x.body as any[];
        this.isLoading = false;
      });
  }
  onDownloadFile() {
    this.request
      .downloadFile(this.file.path, this.file.name)
      .subscribe((progress) => {
      });
  }
  onUpload(event) {
    this.fileToUpload = event.currentFiles[0];
    this.postFile(this.fileToUpload);
    this.fileUpload.clear();
  }
  deleteSelectedProducts(id) {
    let params = new HttpParams().set('id',id);
    this.request.deleteWithQuery(params,ResourcePath.FILE).subscribe(x=> {
      if (x.status === 200) {
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Xóa CV thành công!',
          life: 3000,
        });
        this.getFile();
      }
      
    })
  }
  postFile(postedFile) {
    const formData = new FormData();
    formData.append('file', postedFile);
    formData.append('email', this.email);
    this.request.post(formData, ResourcePath.FILE, 'upload').subscribe((x) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Tải lên CV thành công!',
        life: 3000,
      });
      this.getFile();
      // if (x.status === 200) {
      //   const data = {
      //     content: 'testtttt',
      //     courseId: this.courseId,
      //     fileId: x.body['id'],
      //   };
      //   this.request.post(data, ResourcePath.COURSE_RESOURCE, ResourcePath.COURSE_RESOURCE_CREATE).subscribe((y) => {
      //     if (y.status === 200) {
      //       this.messageService.add({
      //         severity: 'success',
      //         summary: 'Successful',
      //         detail: 'Thêm tài liệu môn học thành công!',
      //         life: 3000,
      //       });
      //       this.getFile();
      //     }
      //   });
      // }
    });
  }
}
