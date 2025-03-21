import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme-preference';
  private isDarkTheme = new BehaviorSubject<boolean>(true);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
   
      const savedTheme = localStorage.getItem(this.THEME_KEY);
      if (savedTheme) {
        this.isDarkTheme.next(savedTheme === 'dark');
      } else {
        // Fall back to system preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.isDarkTheme.next(mediaQuery.matches);
        
        mediaQuery.addEventListener('change', (e) => {
          if (!localStorage.getItem(this.THEME_KEY)) {
            this.isDarkTheme.next(e.matches);
          }
        });
      }
    }
  }

  toggleTheme() {
    const newTheme = !this.isDarkTheme.value;
    this.isDarkTheme.next(newTheme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.THEME_KEY, newTheme ? 'dark' : 'light');
    }
  }
}