import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule } from 'src/app/modules/admin/admin.model';
import { StoreValueService } from 'src/app/services/store-value.service';
import { WebRequestService } from 'src/app/services/web-request.service';
import { DatePipe } from '@angular/common';
import { ResourcePath } from 'src/app/helper/resource-path';
import { HttpParams } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-course-event',
  templateUrl: './course-event.component.html',
  styleUrls: ['./course-event.component.scss'],
})
export class CourseEventComponent implements OnInit {
  isDisplay: boolean = false;
  isDisplayDetail: boolean = false;
  listUser: any[] = [];
  role: string = this.sValue.getLocalStorage('role') ?? null;
  listSchedule: Schedule[];
  schedule: Schedule;
  selectedProducts: any[];
  startTime: Date = null;
  email: string;
  endTime: Date = null;
  scheduleId: string;
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
  courseId: string;
  currentEvent: any[] = [];
  isLoading: boolean = false;
  scheduleByUser: any[] = [];
  constructor(
    private request: WebRequestService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private sValue: StoreValueService,
    private message: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.event.courseId = this.route.snapshot.paramMap.get('id');
    this.courseId = this.event.courseId;
    console.log(this.courseId);
    this.email = this.sValue.getLocalStorage('email') ?? null;
    this.getListSchedule();
    this.getScheduleByEmail();
    console.log(this.scheduleByUser);
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  cancelEvent(id) {
    const data = {
      scheduleId: id,
      userIdList: [this.email],
    };
    this.request
      .postWithTextResponse(
        data,
        ResourcePath.SCHEDULE,
        ResourcePath.SCHEDULE_REMOVE_USER
      )
      .subscribe(
        (x) => {
          if (x.status === 200) {
            this.message.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Hủy đăng ký tham sự kiện thành công!',
              life: 3000,
            });
            this.scheduleByUser = this.scheduleByUser.filter(x => x !== id);
          }
        },
        (err) => {
          if (err.status === 400) {
            this.message.add({
              severity: 'error',
              summary: 'Thất bại',
              detail: 'Bạn chưa tham gia sự kiện này!',
              life: 3000,
            });
          }
        }
      );
  }
  async getScheduleByEmail() {
    let params = new HttpParams().set('email', this.email);
    const data = await this.request
      .getWithQuery(params, ResourcePath.SCHEDULE, ResourcePath.GET_BY_EMAIL)
      .toPromise();
    const body = data.body as any[];
    body.forEach((x) => {
      this.scheduleByUser.push(x.id);
    });
  }
  showDialog() {
    if (this.role === 'INSTRUCTOR') {
      this.isDisplay = true;
    }
  }

  getListUserByScheduleId() {
    this.listUser = [];
    this.request
      .get(ResourcePath.USER, ResourcePath.GET_BY_SCHEDULE_ID, this.scheduleId)
      .subscribe((x) => {
        console.log(x);
        const data = x.body as any[];
        data.forEach((e) => {
          this.listUser.push(e.email);
        });
      });

  }
  joinEvent(event) {
    const data = {
      scheduleId: event,
      userIdList: [this.email],
    };
    this.request
      .postWithTextResponse(
        data,
        ResourcePath.SCHEDULE,
        ResourcePath.SCHEDULE_ADD_USER
      )
      .subscribe(
        (x) => {
          if (x.status === 200) {
            this.message.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Bạn đã đăng ký tham sự kiện này!',
              life: 3000,
            });
            this.getListSchedule();
            this.getScheduleByEmail();
          }
        },
        (err) => {
          if (err.status === 400) {
            this.message.add({
              severity: 'error',
              summary: 'Thất bại',
              detail: 'Bạn đã đăng ký sự kiện này trước đó!',
              life: 3000,
            });
          }
        }
      );
  }
  addEvent() {
    this.event.createdBy = this.email;
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
          this.isDisplay = false;
          this.getListSchedule();
        });
      }
    } else {
    }
  }
  viewDetail(id) {
    this.scheduleId = id;
    this.isDisplayDetail = true;
    this.getScheduleById();
    this.getListUserByScheduleId();
  }
  getScheduleById() {
    this.isLoading = true;
    let params = new HttpParams().set('id', this.scheduleId);
    this.request
      .getWithQuery(params, ResourcePath.SCHEDULE, ResourcePath.GET_BY_ID)
      .subscribe((x) => {
        this.schedule = x.body as Schedule;
        this.isLoading = false;
      });
  }
  getListSchedule() {
    this.isLoading = true;
    let params = new HttpParams().set('id', this.event.courseId);
    this.request
      .getWithQuery(
        params,
        ResourcePath.SCHEDULE,
        ResourcePath.GET_BY_COURSE_ID
      )
      .subscribe((x) => {
        this.listSchedule = x.body as Schedule[];
        this.isLoading = false;
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
