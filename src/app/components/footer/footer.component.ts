import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  isDarkTheme$: Observable<boolean>;

  constructor(private themeService: ThemeService) {
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
  }

  links = [
    { url: '', label: 'Newsletter' },
    { url: '', label: 'Donate a Coffee' },
    { url: '', label: 'RSS' },
  ];

  madeWithLinks = [
    {
      url: 'https://sass-lang.com/',
      label: 'Sass',
      icon: 'assets/images/sass.svg',
    },
    {
      url: 'https://angular.dev/',
      label: 'Angular',
      icon: 'assets/images/angular-icon.svg',
    },
    {
      url: 'https://firebase.google.com/',
      label: 'Firebase',
      icon: 'assets/images/firebase.svg',
    },
  ];
}
