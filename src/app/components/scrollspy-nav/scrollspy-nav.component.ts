import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
// @ts-expect-error: Gumshoe is a JavaScript library, not a TypeScript module
import Gumshoe from 'gumshoejs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-scrollspy-nav',
  standalone: true,
  templateUrl: './scrollspy-nav.component.html',
  styleUrls: ['./scrollspy-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    RouterLink,
  ],
})
export class ScrollspyNavComponent implements OnChanges, OnDestroy {
  headings = input.required<Element[] | undefined>();

  private scrollSpy: Gumshoe | undefined;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private zone: NgZone,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['headings']?.currentValue) {
      this.setScrollSpy();
    }
  }

  ngOnDestroy(): void {
    this.destroyScrollSpy();
  }

  destroyScrollSpy(): void {
    if (this.scrollSpy) {
      this.scrollSpy.destroy();
    }
  }

  setScrollSpy(): void {
    if (this.scrollSpy) {
      this.scrollSpy.setup();
      return;
    }
    this.zone.onStable
      .pipe(first())
      .subscribe(() => {
        const hostElement = this.elementRef.nativeElement;
        const linkSelector = `${hostElement.tagName}.${hostElement.className} a`;
        this.scrollSpy = new Gumshoe(linkSelector, { offset: 128, reflow: true });
      });
  }
}