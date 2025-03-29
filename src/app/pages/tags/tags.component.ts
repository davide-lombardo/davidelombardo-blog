import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroComponent } from "../../components/hero/hero.component";
import { ContainerComponent } from "../../components/container/container.component";
import { PostService } from '../../services/post.service';
import { TagService } from '../../services/tags.service';
import { PostMetadata } from '../../models/post.model';
import { slugify } from '../../utils/helper';

interface TagGroup {
  letter: string;
  tags: Array<{
    name: string;
    count: number;
  }>;
}

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    HeroComponent, 
    ContainerComponent
  ],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent implements OnInit {
  tagGroups = signal<TagGroup[]>([]);
  originalTagName = signal<string>('');
  postCount = signal<number>(0);
  taggedPosts = signal<PostMetadata[]>([]);

  constructor(
    private postService: PostService,
    private tagService: TagService,
  ) {}

  ngOnInit(): void {
    this.loadTagsGroups();
  }

  private loadTagsGroups(): void {
    this.postService.getPostMetadata().subscribe(posts => {
      // Safely filter out posts without tags
      const postsWithTags = posts.filter(post => post.tags && post.tags.length > 0);
      
      const tagCounts = this.tagService.getTagCounts(postsWithTags);
      
      const groupedTags = Object.entries(tagCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name))
        .reduce((acc, tag) => {
          const letter = tag.name.charAt(0).toUpperCase();
          const group = acc.find(g => g.letter === letter);
          
          if (group) {
            group.tags.push(tag);
          } else {
            acc.push({ letter, tags: [tag] });
          }
          
          return acc;
        }, [] as TagGroup[]);

      this.tagGroups.set(groupedTags);
    });
  }

  slugify(tagName: string): string {
    return slugify(tagName);
  }
}