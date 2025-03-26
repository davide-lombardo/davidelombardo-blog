import { isPlatformBrowser } from '@angular/common';

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export function appendComments(
  platformId: Object,
  isDarkTheme: boolean = true
): void {
  if (!isPlatformBrowser(platformId)) return;
  if (!document) return;

  const commentDiv = document.getElementById('append-comments-here');
  if (!commentDiv) return;

  // Remove existing utterances iframe if it exists
  const utterancesFrame = document.querySelector('.utterances-frame');
  if (utterancesFrame) {
    utterancesFrame.remove();
  }

  // Remove existing utterances div if it exists
  const utterancesDiv = document.querySelector('.utterances');
  if (utterancesDiv) {
    utterancesDiv.remove();
  }

  // Remove existing script if it exists
  const existingScript = document.getElementById('utterances');
  if (existingScript) {
    existingScript.remove();
  }

  const commentScript = document.createElement('script');
  commentScript.async = true;
  commentScript.src = 'https://utteranc.es/client.js';
  commentScript.setAttribute('repo', 'davide-lombardo/comments');
  commentScript.setAttribute('issue-term', 'pathname');
  commentScript.setAttribute('id', 'utterances');
  commentScript.setAttribute('crossorigin', 'anonymous');
  commentScript.setAttribute(
    'theme',
    isDarkTheme ? 'dark-blue' : 'github-light'
  );

  commentDiv.appendChild(commentScript);
}
