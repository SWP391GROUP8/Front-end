import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() id: string;
  @Input() isBlog: boolean;
  comments: string;
  count: number;
  constructor() { }
  ngOnInit() {
    this.count = 0;
  }

  receiveComment($event) {
    this.comments = $event;
    this.count = this.comments.length;
  }

  recieveCount($event) {
    this.comments = $event;
    this.count = this.comments.length;
  }

}
