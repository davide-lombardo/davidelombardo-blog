import { Injectable } from '@angular/core';
import { PostMetadata } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  getTagCounts(posts: PostMetadata[]): Record<string, number> {
    return posts.reduce((acc, post) => {
      if (post.tags) {
        post.tags.forEach((tag: string) => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
      }
      return acc;
    }, {} as Record<string, number>);
  }
}