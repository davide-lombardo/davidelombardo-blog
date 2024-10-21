import { Component, input } from '@angular/core';
import { getSimplifiedPosts } from '../../utils/helper';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [PostListComponent, HeroComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  data = input<any>();
  posts: any[] = [];
  simplifiedPosts: any[];
  title = 'Notes';
  description = 'Personal notes about life, music, art, projects, and everything else I want to write about.';

  constructor() {
    this.simplifiedPosts = getSimplifiedPosts(this.posts);
  }
}
