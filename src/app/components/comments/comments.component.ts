import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { appendComments } from '../../utils/helper';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    appendComments(this.platformId)
  }
}
