import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post, PostMetadata } from '../models/post.model';
import matter from 'gray-matter-browser';
import MarkdownIt from 'markdown-it';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private markdown = new MarkdownIt();

  constructor(private http: HttpClient) {}

   // Method to fetch and process post markdown data
   getPostDetail(slug: string): Observable<{ content: string; metadata: PostMetadata }> {
    return this.http.get(`assets/posts/${slug}/post.md`, { responseType: 'text' }).pipe(
      map((markdownFile: string) => {
        const matterObj = matter(markdownFile);
        const { title = '', subtitle = '', date = '', tags = '', comments_off = false } = matterObj.data;

        const tagsArray = tags.split(',').map((tag: string) => tag.trim());

        const postMeta: PostMetadata = {
          title,
          subtitle,
          date,
          tags: tagsArray,
          comments_off,
        };

        const content = this.markdown.render(matterObj.content);

        return { content, metadata: postMeta };
      })
    );
  }

  // Fetch post metadata (for list view)
  getPostMetadata(getLatest: boolean = false): Observable<Post[]> {
    return this.http.get<Post[]>('assets/posts/post-metadata.json').pipe(
      map(posts => {
        const convertedPosts = posts.map(post => ({
          ...post,
          date: new Date(post.date)
        }));

        if (getLatest) {
          // Sort by date and slice the array to get the latest 3 posts
          return convertedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
        }
        return convertedPosts;
      })
    );
  }
}
