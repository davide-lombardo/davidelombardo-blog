import { Component, Inject, PLATFORM_ID, Signal } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterOutlet } from '@angular/router';
import { MetaService } from './services/meta.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isDarkTheme: Signal<boolean>;

  constructor(
    private metaService: MetaService, 
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isDarkTheme = this.themeService.isDarkTheme$;

    this.setDefaultMetaTags();
  }

  private setDefaultMetaTags() {
    this.metaService.updateMetaTags({
      title: 'Davide Lombardo\'s Blog',
      subtitle: 'A Journey in Front-End Development and Life',
      tags: ['Angular', 'Web Development', 'Personal Blog'],
      image: '/assets/images/sloth-logo.png',
    });
  }
}
