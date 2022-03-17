import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ResourcePath } from 'src/app/helper/resource-path';
import { WebRequestService } from 'src/app/services/web-request.service';

@Component({
  selector: 'app-manage-cv',
  templateUrl: './manage-cv.component.html',
  styleUrls: ['./manage-cv.component.scss'],
})
export class ManageCvComponent implements OnInit {
  listCV: any[] = [];
  @ViewChild('fileUpload') fileUpload: any;
  fileToUpload: File | null = null;
  constructor(
    private request: WebRequestService,
    private messageService: MessageService
  ) {}
  file: any;
  ngOnInit(): void {}
  deleteSelectedProducts() {}
  async getFile(id) {
    let params = new HttpParams().set('id', id);
    const data = await this.request
      .getWithQuery(params, ResourcePath.FILE, ResourcePath.GET_BY_ID, id)
      .toPromise();

    this.file = data.body;
    this.listCV.push(data.body);
  }
  onDownloadFile() {
    this.request.downloadFile(this.file.path, this.file.name).subscribe((progress)=>{
      console.log(progress);
   });
  }
  onUpload(event) {
    this.fileToUpload = event.currentFiles[0];
    this.postFile(this.fileToUpload);
    this.fileUpload.clear();
  }

  postFile(postedFile) {
    const formData = new FormData();
    formData.append('file', postedFile);
    this.request.post(formData, ResourcePath.FILE, 'upload').subscribe((x) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Thêm tài liệu môn học thành công!',
        life: 3000,
      });
      this.getFile(x.body['id']);
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
