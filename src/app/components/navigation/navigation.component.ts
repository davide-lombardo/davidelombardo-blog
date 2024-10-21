import { Component, input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

interface NavItem {
  url: string;
  label: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  mainNavItems: NavItem[] = [
    { url: '/posts', label: 'articles' },
    { url: '/projects', label: 'projects' },
    { url: '/posts/about-me', label: 'about me' },
  ];
}
