import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items: any[] = [];
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.items = [
      {
        title: 'Môn học',
        img: '../../../assets/img/course.jpg',
        url: '/course',
      },
      {
        title: 'Bài viết',
        img: '../../../assets/img/blogger-img.jpg',
        url: '/blog',
      },
      {
        title: 'Tuyển dụng',
        img: '../../../assets/img/recruit.png',
        url: '/job',
      },
    ];
  }
  navigateTo(url){
    console.log(url);
    this.route.navigateByUrl(url);
  }
}
