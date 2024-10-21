import { Component, input } from '@angular/core';
import { PostComponent } from "../post/post.component";
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {
  data = input.required<Post[] | null>(); 
  showYears = input<boolean>(false); 
  prefix = input<string>(''); 
  query = input<string>();

  postsByYear: { [key: string]: any[] } = {};
  years: string[] = [];

  ngOnInit(): void {
    this.groupPostsByYear();
  }

  private groupPostsByYear(): void {
    this.data()?.forEach((post) => {
      const year = post.date.getFullYear();
      this.postsByYear[year] = this.postsByYear[year] || [];
      this.postsByYear[year].push(post);
    });
    this.years = Object.keys(this.postsByYear).reverse();
  }
}
