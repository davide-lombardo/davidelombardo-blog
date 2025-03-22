import { Injectable, PLATFORM_ID, Inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme-preference';
  private isDarkTheme = signal<boolean>(true);

  get isDarkTheme$() {
    return this.isDarkTheme.asReadonly();
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
   
      const savedTheme = localStorage.getItem(this.THEME_KEY);
      if (savedTheme) {
        this.isDarkTheme.set(savedTheme === 'dark');
      } else {
        // Fall back to system preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.isDarkTheme.set(mediaQuery.matches);
        
        mediaQuery.addEventListener('change', (e) => {
          if (!localStorage.getItem(this.THEME_KEY)) {
            this.isDarkTheme.set(e.matches);
          }
        });
      }
    }
  }

  toggleTheme() {
    const newTheme = !this.isDarkTheme();
    this.isDarkTheme.set(newTheme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.THEME_KEY, newTheme ? 'dark' : 'light');
    }
  }
}