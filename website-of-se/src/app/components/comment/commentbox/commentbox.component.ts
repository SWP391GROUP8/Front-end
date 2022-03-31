import { HttpParams } from '@angular/common/http';
import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResourcePath } from 'src/app/helper/resource-path';
import { WebRequestService } from 'src/app/services/web-request.service';

@Component({
  selector: 'app-commentbox',
  templateUrl: './commentbox.component.html',
  styleUrls: ['./commentbox.component.scss'],
})
export class CommentboxComponent implements OnInit {
  @Input() receiveId: string;
  @Input() isBlog: boolean;
  commentForm: FormGroup;
  commentInfo: Array<object> = [];
  submitted: Boolean = false;
  public id = 0;
  userId: string;
  @Output() usercomment = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private request: WebRequestService
  ) {}

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('email')) ?? null;
    this.getComment()
    this.createForm();
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required]],
    });
  }
  getComment() {
    if (this.isBlog) {
      let params = new HttpParams().set('blogId', this.receiveId);
      this.request.getWithQuery(params,ResourcePath.COMMENT,ResourcePath.COMMENT_BLOG).subscribe(x => {
        this.commentInfo = x.body as Array<object>;
        this.usercomment.emit(this.commentInfo);
      })
    } else {
      let params = new HttpParams().set('qaId', this.receiveId);
      this.request.getWithQuery(params,ResourcePath.COMMENT,ResourcePath.COMMENT_COURSE).subscribe(x => {
        this.commentInfo = x.body as Array<object>;
        this.usercomment.emit(this.commentInfo);
      })
    }
    
  }
  onSubmit() {
    this.submitted = true;
    if (this.commentForm.invalid) {
      return false;
    } else {
      // this.commentInfo.push({
      //   commentId: this.id++,
      //   currentDate: new Date(),
      //   commentTxt: this.commentForm.controls['comment'].value,
      //   replyComment: [],
      // });
      // this.usercomment.emit(this.commentInfo);
      console.log(this.receiveId);
      console.log(this.isBlog);
      let data = {
        content: this.commentForm.controls['comment'].value,
        userId: this.userId,
      };
      if (this.isBlog) {
        data['blogId'] = this.receiveId;
      } else {
        data['course_qaId'] = this.receiveId;
      }
      this.request.post(data,ResourcePath.COMMENT).subscribe(x=>{
        console.log(x);
        this.getComment();
      });
    }
  }
}
