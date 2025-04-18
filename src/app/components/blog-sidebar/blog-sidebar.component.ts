import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { slugify } from '../../utils/helper';

@Component({
  selector: 'app-blog-sidebar',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './blog-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './blog-sidebar.component.scss',
})
export class BlogSidebarComponent implements OnInit {
  date = input.required<string>();
  tags = input.required<string[]>();

  category!: string;

  ngOnInit(): void {
    this.tags().filter(tag => tag.trim() !== '');
  }

  // Helper method to generate slug from category/tag
  slugify(text: string): string {
    return slugify(text);
  }
}
