import { StoreValueService } from './../../../services/store-value.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  email: string;
  constructor(
    private storeValue: StoreValueService,
    ) {}

  ngOnInit(): void {
    this.email = this.storeValue.getLocalStorage('email') ?? '';
  }
 
}