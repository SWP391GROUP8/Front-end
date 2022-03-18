import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Input, Output, OnChanges, EventEmitter,
  Directive, ViewContainerRef, ViewChildren, QueryList, ComponentFactoryResolver, AfterContentInit} from '@angular/core';
import { ResourcePath } from 'src/app/helper/resource-path';
import { WebRequestService } from 'src/app/services/web-request.service';
import { ChildboxComponent } from '../childbox/childbox.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[datacontainer]',
})
export class DatacontainerDirective  {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})

export class CommentsComponent implements OnInit, OnChanges{
  @Input() postComment: Array<object> = [];
  @Output() countComments = new EventEmitter();
  public loadComponent = false;
  public commentIndex = 0;
  public reply: Array<object> = [];

  // @ViewChildren decorator to grab elements from the host view
  /* The return type of ViewChildren is QueryList.
  QueryList is just a fancy name for an object that stores
  a list of items. What is special about this object is
  when the state of the application changes Angular will
  automatically update the object items for you. */
  @ViewChildren (DatacontainerDirective) entry: QueryList<DatacontainerDirective>;

  constructor(private resolver: ComponentFactoryResolver, private request: WebRequestService) { }

  ngOnInit() {
  }


  ngOnChanges() {
    if (this.postComment !== undefined) {
      console.log('Main array====>', this.postComment);
    }
  }

  removeComment(id,no) {
    this.postComment.splice(no, 1);
    this.countComments.emit(this.postComment);
    let params = new HttpParams().set('id',id);
    this.request.deleteWithQuery(params,ResourcePath.COMMENT).subscribe(x => {
      console.log(x);
      
    })
  }

  

 


}
