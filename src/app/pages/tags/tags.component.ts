import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { HeroComponent } from "../../components/hero/hero.component";
import { KeyValuePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from "../../components/container/container.component";

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [HeroComponent, KeyValuePipe, RouterLink, ContainerComponent],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  groupTags: { [key: string]: any[] } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTags().pipe(
      map(data => {
        const tags = data.tags.group;
        return tags.reduce((letterMap: { [key: string]: any[] }, tag: any) => {
          const letter = tag.name.charAt(0);
          const newArr = letterMap[letter] ? [...letterMap[letter], tag] : [tag];
          return { ...letterMap, [letter]: newArr };
        }, {});
      }),
      takeUntil(this.destroy$)
    ).subscribe(groupedTags => {
      this.groupTags = groupedTags;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  slugify(tagName: string): string {
    return tagName.toLowerCase().replace(/\s+/g, '-');
  }

  getTags(): Observable<any> {
    return this.http.get('assets/tags/tags.json');
  }
}
