import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobManagement } from './job.model';

@Component({
  selector: 'app-manage-job',
  templateUrl: './manage-job.component.html',
  styleUrls: ['./manage-job.component.scss'],
})
export class ManageJobComponent implements OnInit {
  isDisplay: boolean = false;
  listJob: JobManagement[] = [
    {
      address: null,
      companyName: null,
      jobDesc: null,
      id: null,
      location: null,
      phone: null,
      title: null,
    },
  ];
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.getListBlog();
  }
  getListBlog() {
    return (this.listJob = [
      {
        address: "Quận 9, Hồ chí Minh",
        companyName: "FPT Software",
        jobDesc: "IT Project Managers are responsible for overseeing all aspects of any project in a company’s IT department, which includes managing a team of employees to ensure projects are completed on time and within their specified budgets. Some of an IT Project Managers day-to-day duties include.",
        id: "1",
        location: "Hồ Chí Minh",
        phone: "0964526377",
        title: "Senior ReactJS",
      },
      {
        address: "Quận 9, Hồ chí Minh",
        companyName: "FPT Software",
        jobDesc: "IT project management is part project management, part technology operations and part general management. IT project managers plan, organise, and integrate cross-functional information technology projects that are significant in scope and impact.",
        id: "2",
        location: "Hồ Chí Minh",
        phone: "0964526377",
        title: "Senior Java",
      },
      {
        address: "Quận 9, Hồ chí Minh",
        companyName: "FPT Software",
        jobDesc: "IT project management is part project management, part technology operations and part general management. IT project managers plan, organise, and integrate cross-functional information technology projects that are significant in scope and impact.",
        id: "3",
        location: "Hồ Chí Minh",
        phone: "0964526377",
        title: "Senior/Junior Angular",
      },
      {
        address: "Quận 9, Hồ chí Minh",
        companyName: "FPT Software",
        jobDesc: "IT project management is part project management, part technology operations and part general management. IT project managers plan, organise, and integrate cross-functional information technology projects that are significant in scope and impact.",
        id: "4",
        location: "Hồ Chí Minh",
        phone: "0964526377",
        title: "Senior/Junior VueJS",
      },
    ]);
  }
  openJobDetail(id) {
    console.log(id);
    this.isDisplay = true;
  }
}
