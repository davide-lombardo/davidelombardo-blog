import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

export interface MetaData {
  title: string;
  subtitle: string;
  tags: string[];
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  constructor(private meta: Meta) {}

  updateMetaTags(metadata: MetaData): void {
    // Remove existing meta tags
    this.meta.removeTag('name="description"');
    this.meta.removeTag('name="keywords"');
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('property="og:url"');

    // Set new meta tags
    const websiteUrl = 'https://davidelombardo-blog.web.app';
    const fullImageUrl = `${websiteUrl}${metadata.image}`;
    this.meta.addTag({ property: 'og:image', content: fullImageUrl });
    this.meta.addTag({ property: 'og:image:width', content: '1200' });
    this.meta.addTag({ property: 'og:image:height', content: '630' });
    this.meta.addTag({ property: 'og:image:alt', content: "blog cover image" });
    this.meta.addTag({ property: 'og:url', content: websiteUrl });


    this.meta.addTag({ name: 'description', content: metadata.subtitle });
    this.meta.addTag({ name: 'keywords', content: metadata.tags.join(', ') });
    this.meta.addTag({ property: 'og:title', content: metadata.title });
    this.meta.addTag({ property: 'og:description', content: metadata.subtitle });
    this.meta.addTag({ property: 'og:type', content: 'website' });
  }
}
