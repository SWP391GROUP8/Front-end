import { StoreValueService } from './../../../services/store-value.service';
import { MenuItem } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-manage-job',
  templateUrl: './manage-job.component.html',
  styleUrls: ['./manage-job.component.scss']
})
export class ManageJobComponent implements OnInit {
  
  email: string;
  constructor(
    private storeValue: StoreValueService,
    ) {}

  ngOnInit(): void {
    this.email = this.storeValue.getLocalStorage('email') ?? '';
  }

}
