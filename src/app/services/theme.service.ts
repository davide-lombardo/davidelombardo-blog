import { Injectable, PLATFORM_ID, Inject, signal, effect } from '@angular/core';
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
      // Initialize from localStorage or system preference
      const savedTheme = localStorage.getItem(this.THEME_KEY);
      if (savedTheme) {
        this.isDarkTheme.set(savedTheme === 'dark');
      } else {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.isDarkTheme.set(mediaQuery.matches);
        
        // Listen for system theme changes
        mediaQuery.addEventListener('change', (e) => {
          if (!localStorage.getItem(this.THEME_KEY)) {
            this.isDarkTheme.set(e.matches);
          }
        });
      }

      // Keep theme in sync
      effect(() => {
        document.documentElement.setAttribute(
          'data-theme',
          this.isDarkTheme() ? 'dark' : 'light'
        );
      });
    }
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const newTheme = !this.isDarkTheme();
      this.isDarkTheme.set(newTheme);
      localStorage.setItem(this.THEME_KEY, newTheme ? 'dark' : 'light');
    }
  }
}