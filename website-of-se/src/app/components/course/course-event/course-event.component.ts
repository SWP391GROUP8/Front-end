import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Schedule } from 'src/app/modules/admin/admin.model';
import { StoreValueService } from 'src/app/services/store-value.service';
import { WebRequestService } from 'src/app/services/web-request.service';
import { DatePipe } from '@angular/common';
import { ResourcePath } from 'src/app/helper/resource-path';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-course-event',
  templateUrl: './course-event.component.html',
  styleUrls: ['./course-event.component.scss'],
})
export class CourseEventComponent implements OnInit {
  isDisplay: boolean = false;
  role: string = 'INSTRUCTOR';
  listSchedule: Schedule[];
  selectedProducts: any[];
  startTime: Date = null;
  endTime: Date = null;
  event: Schedule = {
    content: null,
    courseId: null,
    createdBy: null,
    endTime: null,
    id: null,
    startTime: null,
    status: null,
    title: null,
  };
  constructor(
    private request: WebRequestService,
    private route: ActivatedRoute,
    private storeValue: StoreValueService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.event.courseId = this.route.snapshot.paramMap.get('id');
    this.event.createdBy = this.storeValue.getLocalStorage('email') ?? null;
    this.getListSchedule();
  }
  showDialog() {
    if (this.role === 'INSTRUCTOR') {
      this.isDisplay = true;
    }
  }
  joinEvent(event){
    console.log(event);
    const data = {
      scheduleId: event,
      userIdList: [
        this.event.createdBy
      ]
    }
    this.request.postWithTextResponse(data,ResourcePath.SCHEDULE,ResourcePath.SCHEDULE_ADD_USER).subscribe(x => {
      console.log(x);
    })
  }
  addEvent() {
    this.event.startTime = this.datePipe.transform(
      this.startTime,
      'dd/MM/yyyy'
    );
    this.event.endTime = this.datePipe.transform(this.endTime, 'dd/MM/yyyy');
    if (this.role === 'INSTRUCTOR') {
      if (
        this.event.title !== null &&
        this.event.startTime !== null &&
        this.event.endTime !== null &&
        this.event.content !== null
      ) {
        this.event.id = this.createId();
        this.event.status = 'OPEN';
        this.request.post(this.event, ResourcePath.SCHEDULE).subscribe((x) => {
          console.log(x);
          this.isDisplay = false;
          this.getListSchedule();
        });
        console.log(this.event);
      }
    } else {
    }
  }
  getListSchedule() {
    let params = new HttpParams().set('id', this.event.courseId);
    this.request
      .getWithQuery(
        params,
        ResourcePath.SCHEDULE,
        ResourcePath.GET_BY_COURSE_ID
      )
      .subscribe((x) => {
        this.listSchedule = x.body as Schedule[];
      });
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
