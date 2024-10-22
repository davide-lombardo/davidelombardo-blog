import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  constructor(private meta: Meta) {}

  updateMetaTags(metadata: { title: string; subtitle: string; tags: string[]; image?: string }) {
    // Remove existing meta tags
    this.meta.removeTag('name="description"');
    this.meta.removeTag('name="keywords"');
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('property="og:description"');

    // Set new meta tags
    this.meta.addTag({ name: 'description', content: metadata.subtitle });
    this.meta.addTag({ name: 'keywords', content: metadata.tags.join(', ') });
    this.meta.addTag({ property: 'og:title', content: metadata.title });
    this.meta.addTag({ property: 'og:description', content: metadata.subtitle });

    if (metadata.image) {
      this.meta.addTag({ property: 'og:image', content: metadata.image });
    }
  }
}
