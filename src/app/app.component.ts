import { Component } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from './services/meta.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  constructor(private metaService: MetaService) {
    this.setDefaultMetaTags();
  }

  setDefaultMetaTags() {
    this.metaService.updateMetaTags({
      title: 'Davide Lombardo\'s Blog',
      subtitle: 'A Journey in Front-End Development and Life',
      tags: ['Angular', 'Web Development', 'Personal Blog'],
      image: '/assets/images/sloth-hero.png',
    });
  }
}
