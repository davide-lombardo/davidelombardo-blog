import { isPlatformBrowser } from '@angular/common';

export function getSimplifiedPosts(
  posts: any[],
  options: { thumbnails?: boolean } = {}
): any[] {
  return posts.map(post => ({
    id: post.node.id,
    date: post.node.frontmatter.date,
    slug: post.node.fields.slug,
    tags: post.node.frontmatter.tags,
    categories: post.node.frontmatter.categories,
    title: post.node.frontmatter.title,
    description: post.node.frontmatter.description,
    ...(options.thumbnails && {
      thumbnail: post.node.frontmatter?.thumbnail?.childImageSharp?.fixed,
    }),
  }));
}

export function getTaxonomyFromPosts(posts: any[], taxonomy: string): string[] {
  return posts
    .reduce((acc: string[], post: any) => {
      return [...new Set([...acc, ...(post[taxonomy] || [])])];
    }, [])
    .sort();
}

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

export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function appendComments(platformId: Object): void {
  if (!isPlatformBrowser(platformId)) return; // Check if we're in the browser
  if (!document) return;

  const commentDiv = document.getElementById('append-comments-here');
  const commentScript = document.createElement('script');

  commentScript.async = true;
  commentScript.src = 'https://utteranc.es/client.js';
  commentScript.setAttribute('repo', 'davide-lombardo/comments');
  commentScript.setAttribute('issue-term', 'pathname');
  commentScript.setAttribute('id', 'utterances');
  commentScript.setAttribute('crossorigin', 'anonymous');
  commentScript.setAttribute('theme', 'dark-blue');

  if (!commentDiv) return;

  if (!commentDiv.firstChild) {
    commentDiv.appendChild(commentScript);
  } else {
    console.error('Error adding utterances comments');
  }
}

export function getFormattedDate(date: string): string {
  const dateArr = date.split(' ');
  if (dateArr[1].startsWith('0')) {
    dateArr[1] = dateArr[1].slice(1, 2);
  } else {
    dateArr[1] = dateArr[1].slice(0, 2);
  }
  dateArr[1] += ',';

  return dateArr[0] + ' ' + dateArr[2];
}