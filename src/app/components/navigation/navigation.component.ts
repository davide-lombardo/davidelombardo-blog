import { Component, inject, Signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TerminalService } from '../../services/terminal.service';
import { getSanitizedIcon } from '../../utils/icons';

interface NavItem {
  url: string;
  label: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  isDarkTheme: Signal<boolean>;
  isMobileMenuOpen = false;
  
  readonly sunIcon: SafeHtml;
  readonly moonIcon: SafeHtml;
  readonly terminalIcon: SafeHtml;
  readonly menuIcon: SafeHtml;
  readonly closeIcon: SafeHtml;

  mainNavItems: NavItem[] = [
    { url: '/posts', label: 'articles' },
    { url: '/projects', label: 'projects' },
    { url: '/about-me', label: 'about me' },
  ];

  private themeService = inject(ThemeService);
  private terminalService = inject(TerminalService);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    this.isDarkTheme = this.themeService.isDarkTheme$;
    this.sunIcon = getSanitizedIcon('SUN', this.sanitizer);
    this.moonIcon = getSanitizedIcon('SUN', this.sanitizer);
    this.terminalIcon = getSanitizedIcon('TERMINAL', this.sanitizer);
    this.menuIcon = getSanitizedIcon('MENU', this.sanitizer);
    this.closeIcon = getSanitizedIcon('CLOSE', this.sanitizer);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();

    if (this.isMobileMenuOpen) {
      this.closeMenuOnNavigation();
    }
  }

  toggleTerminal(): void {
    this.terminalService.toggleTerminal();

    if (this.isMobileMenuOpen) {
      this.closeMenuOnNavigation();
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    // Prevent scrolling when menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenuOnNavigation(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}
