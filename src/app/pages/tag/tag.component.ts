import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { HeroComponent } from "../../components/hero/hero.component";
import { PostListComponent } from "../../components/post-list/post-list.component";
import { ContainerComponent } from "../../components/container/container.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [HeroComponent, PostListComponent, ContainerComponent],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  
  tag: string = '';
  totalCount: number = 0;
  posts: any[] = [];
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tag = params.get('tagSlug') || '';

      this.titleService.setTitle(`${this.tag} | Davide Lombardo Blog`);
      // this.metaService.addTag({ name: 'description', content: `Posts tagged with ${this.tag}` });

      this.getTagData(this.tag).pipe(
        map((data) => {
          console.log(data)
          this.posts = data.allMarkdownRemark.edges;
          this.totalCount = data.allMarkdownRemark.totalCount;
          this.message = this.totalCount === 1 ? ' post tagged:' : ' posts tagged:';
        }),
        takeUntil(this.destroy$)
      ).subscribe();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTagData(tag: string): Observable<any> {
    return this.http.get(`assets/tags/${tag}.json`);
  }

}
