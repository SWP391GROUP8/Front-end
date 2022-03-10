import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourcePath } from 'src/app/helper/resource-path';
import { Course } from 'src/app/modules/admin/admin.model';
import { WebRequestService } from 'src/app/services/web-request.service';

export interface Semester {
  id: string;
  name: number;
}
@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.scss']
})
export class ListCourseComponent implements OnInit {
  semesters: Semester[] = [{ id: null, name: null }];
  courses: Course[] = [];

  course: Course = { id: '', author: '', code: '', name: '', status: '' };
  selectedSemester: Semester;
  constructor(private request: WebRequestService, private router: Router) {}

  ngOnInit(): void {
    this.semesters = [
      {name: 1, id: '1'},
      {name: 2, id: '2'},
      {name: 3, id: '3'},
      {name: 4, id: '4'},
      {name: 5, id: '5'},
      {name: 6, id: '6'},
      {name: 7, id: '7'},
      {name: 8, id: '8'},
      {name: 9, id: '9'}
  ];
  this.getListCourse();
  }
  getListCourse(){
    this.request.get(ResourcePath.COURSE).subscribe(x => {
      this.courses = x.body as Course[];
    })
  }
  navigateToCourseDetail(id) {
    this.router.navigate(['/course', id]);
  }
  test() {
    const data = {
      
    }
  }
}

