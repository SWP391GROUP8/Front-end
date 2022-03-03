import { Component, OnInit } from '@angular/core';

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
  selectedSemester: number;
  constructor() {}

  ngOnInit(): void {
    this.semesters = [
      {name:1, id: '1'},
      {name: 2, id: '2'},
      {name: 3, id: '3'},
      {name: 4, id: '4'},
      {name: 5, id: '5'},
      {name: 6, id: '6'},
      {name: 7, id: '7'},
      {name: 8, id: '8'},
      {name: 9, id: '9'}
  ];

  }
}

