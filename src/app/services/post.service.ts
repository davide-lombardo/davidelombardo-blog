import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PostMetadata, PostDetail } from '../models/post.model';
import fm, { FrontMatterResult } from 'front-matter';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(private http: HttpClient) {}

  getPostDetail(slug: string): Observable<{ content: string; metadata: PostDetail }> {
    return this.http
      .get(`assets/posts/${slug}/post.md`, { responseType: 'text' })
      .pipe(
        map((markdownFile: string) => {
          const matterResult: FrontMatterResult<PostDetail> = fm(markdownFile);
          
          const {
            title = '',
            subtitle = '',
            date = '',
            tags = '',
            comments_off = false,
            infoPanel,
          } = matterResult.attributes;
          
          const tagsArray = typeof tags === 'string' 
            ? tags.split(',').map((tag: string) => tag.trim())
            : [];
            
          const postMeta: PostDetail = {
            title,
            subtitle,
            date,
            tags: tagsArray,
            comments_off,
            infoPanel,
          };

          return { content: matterResult.body, metadata: postMeta };
        })
      );
  }

  getPostMetadata(getLatest: boolean = false): Observable<PostMetadata[]> {
    return this.http.get<PostMetadata[]>('assets/posts/post-metadata.json').pipe(
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
