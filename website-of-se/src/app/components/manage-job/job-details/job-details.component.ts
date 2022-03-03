import { Component, Input, OnInit } from '@angular/core';
import { JobManagement } from '../job.model';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  @Input() id: any;
  job: JobManagement = {
    address: null,
    companyName: null,
    jobDesc: null,
    id: null,
    location: null,
    phone: null,
    title: null,
  }
  constructor() { }

  ngOnInit(): void {
    this.job = {
      address: "Quận 9, Hồ chí Minh",
      companyName: "FPT Software",
      jobDesc: "IT Project Managers are responsible for overseeing all aspects of any project in a company’s IT department, which includes managing a team of employees to ensure projects are completed on time and within their specified budgets. Some of an IT Project Managers day-to-day duties include.",
      id: "1",
      location: "Hồ Chí Minh",
      phone: "0964526377",
      title: "Senior ReactJS",
    }
  }

}
