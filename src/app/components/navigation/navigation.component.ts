import { Component, input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

interface NavItem {
  url: string;
  label: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterModule, AsyncPipe],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  isDarkTheme$: Observable<boolean>;
  mainNavItems: NavItem[] = [
    { url: '/posts', label: 'articles' },
    { url: '/projects', label: 'projects' },
    { url: '/about-me', label: 'about me' },
  ];
  

  ICONS = {
    SUN: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
    MOON: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`
  };

  sunIcon;
  moonIcon;
  
  constructor(private themeService: ThemeService, private sanitizer: DomSanitizer) {
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
    this.sunIcon = this.sanitizer.bypassSecurityTrustHtml(this.ICONS.SUN);
    this.moonIcon = this.sanitizer.bypassSecurityTrustHtml(this.ICONS.MOON);
  }
  
  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
