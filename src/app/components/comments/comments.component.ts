import {
  Component,
  effect,
  Inject, PLATFORM_ID,
  Signal
} from '@angular/core';
import { appendComments } from '../../utils/helper';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  isDarkTheme: Signal<boolean>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private themeService: ThemeService
  ) {
    this.isDarkTheme = this.themeService.isDarkTheme$;
    effect(() => {
      appendComments(this.platformId, this.isDarkTheme());
    });
  }
}
