import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { is } from 'date-fns/locale';
import { BlogManagement } from '../blog.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
  isLike: boolean = false;
  comment: string = '';
  blog: BlogManagement = {
    authorId: null,
    commentId: null,
    content: null,
    id: null,
    reaction: null,
    status: null,
    title: null,
  };
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.blog = {
      authorId: 'Tri Huynh',
      commentId: 'null',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida rutrum odio vitae maximus. Nulla facilisi. Proin lorem ipsum, rutrum et auctor id, mattis vitae ante. Nulla dapibus, elit in rhoncus sollicitudin, metus tellus vestibulum arcu, vitae sollicitudin odio nisi eu ante. Pellentesque pellentesque, erat eu euismod posuere, lorem tortor mollis turpis, nec accumsan magna tortor fermentum tellus. Sed facilisis, est non consectetur posuere, ex augue tempus orci, eu consectetur nisi dolor eget neque. Ut sed cursus risus. Aenean non tincidunt nulla. Morbi pharetra turpis maximus tempor volutpat. Aliquam congue scelerisque pharetra. Sed fringilla massa non eros imperdiet, et convallis velit vehicula. Duis volutpat ligula quam, id commodo ante commodo commodo. In a risus at libero euismod imperdiet. Mauris non tincidunt justo. Sed bibendum, nibh ac malesuada dapibus, libero metus scelerisque elit, non luctus arcu diam cursus urna.',
      id: '1',
      reaction: 5,
      status: 'Open',
      title: 'Test Title',
    };
  }
  reaction() {
    if (this.isLike === false) {
      this.isLike = true;
      this.blog.reaction += 1;
    } else {
      this.isLike = false;
      this.blog.reaction-= 1;
    }
  }
}
