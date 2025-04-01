import { Component, Inject, PLATFORM_ID, Signal } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterOutlet } from '@angular/router';
import { MetaService } from './services/meta.service';
import { ThemeService } from './services/theme.service';
import { TerminalComponent } from "./components/terminal/terminal.component";
import { TerminalService } from './services/terminal.service';
import { ContainerComponent } from "./components/container/container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, RouterOutlet, TerminalComponent, ContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isDarkTheme: Signal<boolean>;
  isTerminalVisible: Signal<boolean>;
  

  constructor(
    private metaService: MetaService, 
    private themeService: ThemeService,
    private terminalService: TerminalService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isDarkTheme = this.themeService.isDarkTheme$;
    this.isTerminalVisible = this.terminalService.isTerminalVisible$

    this.setDefaultMetaTags();
  }

  private setDefaultMetaTags(): void {
    this.metaService.updateMetaTags({
      title: 'Davide Lombardo\'s Blog',
      subtitle: 'A Journey in Front-End Development and Life',
      tags: ['Angular', 'Web Development', 'Personal Blog'],
      image: '/assets/images/sloth-logo.png',
    });
  }
}
