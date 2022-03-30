import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResourcePath } from 'src/app/helper/resource-path';
import { WebRequestService } from 'src/app/services/web-request.service';
import { Schedule } from '../../../admin.model';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss'],
})
export class ListEventComponent implements OnInit {
  products: Schedule[];
  selectedProducts: Schedule[];
  isLoading: boolean = false;
  constructor(
    private request: WebRequestService,
    private cfService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getListSchedule();
  }
  deleteProduct(product: Schedule) {
    this.cfService.confirm({
      message: 'Bạn có chắc muốn xóa sự kiện này?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let params = new HttpParams().set('id', product.id);
        this.request
          .deleteWithQuery(params, ResourcePath.SCHEDULE)
          .subscribe((x) => {
            if (x.status === 200) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Xóa sự kiện thành công!',
                life: 3000,
              });
              this.getListSchedule();
            }
          });
      },
    });
  }
  getListSchedule() {
    this.request
      .get(ResourcePath.SCHEDULE)
      .subscribe((x) => {
        this.products = x.body as Schedule[];
        this.isLoading = false;
      });
  }
}
