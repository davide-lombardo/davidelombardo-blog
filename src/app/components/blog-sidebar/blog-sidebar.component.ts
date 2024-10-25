import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { slugify } from '../../utils/helper';
import { CommentsComponent } from "../comments/comments.component";

@Component({
  selector: 'app-blog-sidebar',
  standalone: true,
  imports: [RouterLink, DatePipe, CommentsComponent],
  templateUrl: './blog-sidebar.component.html',
  styleUrl: './blog-sidebar.component.scss'
})
export class BlogSidebarComponent {
  date = input.required<string>();
  tags = input.required<string[]>();


  category!: string;

  ngOnInit(): void {
    this.tags().filter(tag => tag.trim() !== '')
    console.log(this.tags());
  }

  // Helper method to generate slug from category/tag
  slugify(text: string): string {
    return slugify(text);
  }
}
