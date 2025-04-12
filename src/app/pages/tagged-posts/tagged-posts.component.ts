import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, map } from 'rxjs/operators';
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
  // Signals for reactive state management
  taggedPosts = signal<PostMetadata[]>([]);
  originalTagName = signal('');
  postCount = signal(0);

  // Use inject instead of constructor DI for cleaner code
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);

  ngOnInit(): void {
    // Use RxJS pipe for better data flow
    this.route.paramMap.pipe(
      // Extract the tag slug parameter
      map(params => params.get('tagSlug')),
      // Only continue if we have a valid tag
      filter(tagSlug => !!tagSlug),
      // Transform the flow to the posts observable
      switchMap(tagSlug => {
        const tag = tagSlug as string;
        this.originalTagName.set(tag);
        
        return this.postService.getPostMetadata().pipe(
          // Process posts in the data stream
          map(posts => {
            const normalizedTag = tag.toLowerCase();
            const filteredPosts = posts.filter(post => 
              post.tags?.some(t => t.toLowerCase() === normalizedTag)
            );
            
            // Update signals with the filtered data
            this.taggedPosts.set(filteredPosts);
            this.postCount.set(filteredPosts.length);
            
            return filteredPosts;
          })
        );
      })
    ).subscribe();
  }
}