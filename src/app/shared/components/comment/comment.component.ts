import { Component, Input } from '@angular/core';
import { IComment } from 'src/app/media/models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass']
})
export class CommentComponent {

  @Input() comment: IComment;

}
