import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  node = input.required<Post>(); 
  query = input<string>(); 
  prefix = input<string>(); 
  isLast = input<boolean>(); 

  get formattedDate(): string | undefined {
    if (this.node().date) {
      const month = this.node().date.toLocaleString('default', { month: 'long' });
      const day = this.node().date.getDate();
      return `${month} ${day}`;
    }
    return undefined;
  }
}
