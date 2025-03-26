import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { PostMetadata } from '../../models/post.model';
import { HeroComponent } from "../../components/hero/hero.component";
import { PostListComponent } from "../../components/post-list/post-list.component";
import { ContainerComponent } from "../../components/container/container.component";
import { slugify } from '../../utils/helper';

@Component({
  selector: 'app-tagged-posts',
  standalone: true,
  imports: [HeroComponent, PostListComponent, ContainerComponent],
  templateUrl: './tagged-posts.component.html',
  styleUrls: ['./tagged-posts.component.scss'],
})
export class TaggedPostsComponent implements OnInit {
  taggedPosts = signal<PostMetadata[]>([]);
  originalTagName = signal('');
  postCount = signal(0);

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const sluggedTag = params.get('tagSlug');
      if (sluggedTag) {
        const tag = slugify(sluggedTag);
        this.originalTagName.set(tag);
        
        this.postService.getPostMetadata().subscribe(posts => {
          const filteredPosts = posts.filter(post => 
            post.tags?.some(
              (t: string) => t.toLowerCase() === tag.toLowerCase()
            )
          );
          
          this.taggedPosts.set(filteredPosts);
          this.postCount.set(filteredPosts.length);
        });
      }
    });
  }
}