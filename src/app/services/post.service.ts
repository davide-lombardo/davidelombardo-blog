import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post, PostMetadata } from '../models/post.model';
import matter from 'gray-matter-browser';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(private http: HttpClient) {}

  // Method to fetch and process post markdown data
  getPostDetail(
    slug: string
  ): Observable<{ content: string; metadata: PostMetadata }> {
    return this.http
      .get(`assets/posts/${slug}/post.md`, { responseType: 'text' })
      .pipe(
        map((markdownFile: string) => {
          const matterResult = matter(markdownFile);
          
          const {
            title = '',
            subtitle = '',
            date = '',
            tags = '',
            comments_off = false,
            infoPanel,
          } = matterResult.data;
          
          const tagsArray = typeof tags === 'string' 
            ? tags.split(',').map((tag: string) => tag.trim())
            : [];
            
          const postMeta: PostMetadata = {
            title,
            subtitle,
            date,
            tags: tagsArray,
            comments_off,
            infoPanel,
          };

          return { content: matterResult.content, metadata: postMeta };
        })
      );
  }

  // Fetch post metadata (for list view)
  getPostMetadata(getLatest: boolean = false): Observable<Post[]> {
    return this.http.get<Post[]>('assets/posts/post-metadata.json').pipe(
      map(posts => {
        const convertedPosts = posts.map(post => ({
          ...post,
          date: new Date(post.date),
        }));

        // Sort by date in descending order
        const sortedPosts = convertedPosts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        // Return only the latest 3 if getLatest is true, otherwise return all sorted posts
        return getLatest ? sortedPosts.slice(0, 3) : sortedPosts;
      })
    );
  }
}
