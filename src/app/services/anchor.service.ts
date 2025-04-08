import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AnchorService {

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) { }

  /**
   * Scroll view to the anchor corresponding to current route fragment.
   * @param fragment Optional fragment to scroll to.
   */
  scrollToAnchor(fragment?: string): void {
    const url = this.router.parseUrl(this.router.url);
    const targetFragment = fragment || url.fragment;
    if (targetFragment) {
      const element = document.getElementById(targetFragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn('Element with ID not found:', targetFragment);
      }
    } else {
      console.log('No fragment found in URL');
    }
  }

  /**
   * Configures the top offset used when scrolling to an anchor.
   * @param offset A position in screen coordinates (a tuple with x and y values)
   * or a function that returns the top offset position.
   */
  setOffset(...params: Parameters<ViewportScroller['setOffset']>): void {
    this.viewportScroller.setOffset(...params);
  }
}
