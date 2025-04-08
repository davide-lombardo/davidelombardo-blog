import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
} from '@angular/core';
import { ZOOM_ANIMATION } from '../scrollspy-nav/scrollspy-nav.animation';
import { ScrollspyNavComponent } from '../scrollspy-nav/scrollspy-nav.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { getSanitizedIcon } from '../../utils/icons';

@Component({
  animations: [ZOOM_ANIMATION],
  standalone: true,
  selector: 'app-scrollspy-nav-layout',
  templateUrl: './scrollspy-nav-layout.component.html',
  styleUrls: ['./scrollspy-nav-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollspyNavComponent],
})
export class ScrollspyNavLayoutComponent {
  headings = input.required<Element[] | undefined>();

  readonly chevronIcon: SafeHtml;
  public showScrollUpButton = false;

  constructor(private sanitizer: DomSanitizer) {
    this.chevronIcon = getSanitizedIcon('CHEVRON_UP', this.sanitizer);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showScrollUpButton = Math.ceil(window.pageYOffset) > 128;
  }

  onScrollUp(): void {
    window.scrollTo(0, 0);
    location.hash = '';
  }
}
