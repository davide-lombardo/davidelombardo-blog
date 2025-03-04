import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

import 'prismjs';

// Language Support
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';

// Plugins
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/autolinker/prism-autolinker';
import 'prismjs/plugins/previewers/prism-previewers';
import 'prismjs/plugins/match-braces/prism-match-braces';

declare const Prism: any;
 
@Injectable({
  providedIn: 'root',
})
export class PrismService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}
 
  highlightAll() {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
  }
 
  highlightHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    const codeElements = div.querySelectorAll('code');
    codeElements.forEach((el) => {
      const lang = el.getAttribute('class')?.replace('language-', '') || 'javascript';
      el.innerHTML = Prism.highlight(
        el.textContent || '',
        Prism.languages[lang],
        lang
      );
    });
    return div.innerHTML;
  }
}