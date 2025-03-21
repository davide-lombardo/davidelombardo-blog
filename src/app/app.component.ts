import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from './services/meta.service';
import { ThemeService } from './services/theme.service';
import { isPlatformBrowser } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  isDarkTheme = true;
  private destroy$ = new Subject<void>();

  constructor(
    private metaService: MetaService, 
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.setDefaultMetaTags();
  }

  ngOnInit() {
    this.setTheme();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setDefaultMetaTags() {
    this.metaService.updateMetaTags({
      title: 'Davide Lombardo\'s Blog',
      subtitle: 'A Journey in Front-End Development and Life',
      tags: ['Angular', 'Web Development', 'Personal Blog'],
      image: '/assets/images/sloth-logo.png',
    });
  }

  setTheme() {
    this.themeService.isDarkTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isDark => {
        this.isDarkTheme = isDark;
        if (isPlatformBrowser(this.platformId)) {
          document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        }
      });
  }
}
