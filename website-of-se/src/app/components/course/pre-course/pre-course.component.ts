import { HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { WebRequestService } from './../../../services/web-request.service';
import { Course } from './../../../models/common.model';
import { ResourcePath } from './../../../helper/resource-path';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-course',
  templateUrl: './pre-course.component.html',
  styleUrls: ['./pre-course.component.scss']
})
export class PreCourseComponent implements OnInit {
  courses: Course[] = [];
  isLoading: boolean = false;
  avatarText: any[];
  id: string;

  course: Course = { id: '', author: '', code: '', name: '', status: '' };
  constructor(
    private request: WebRequestService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.isLoading = true;
    this.getListPreCourse(this.id);
  }
  getListPreCourse(id: string) {
    
    let params = new HttpParams().set('courseId', id);
    this.request.getWithQuery(params, ResourcePath.COURSE, ResourcePath.PRE_COURSE).subscribe(x => {
      this.courses = x.body as Course[];
      this.isLoading = false;
    })
  }
  redirectTo(id: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/course', id]));
  }
}
