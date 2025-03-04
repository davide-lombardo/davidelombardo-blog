import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card anchored large skeleton-card">
      <div class="skeleton-header">
        <div class="skeleton-time"></div>
        <div class="skeleton-title"></div>
      </div>
      <div class="skeleton-description"></div>
      <div class="skeleton-links">
        <div class="skeleton-button"></div>
        <div class="skeleton-button"></div>
      </div>
    </div>
  `,
  styles: [`
    .skeleton-card {
      background: rgba(255, 255, 255, 0.1);
      position: relative;
      overflow: hidden;
    }

    .skeleton-header, 
    .skeleton-description, 
    .skeleton-links {
      background: rgba(255, 255, 255, 0.05);
      margin-bottom: 0.5rem;
    }

    .skeleton-time {
      width: 50px;
      height: 16px;
      background: rgba(255, 255, 255, 0.1);
      margin-bottom: 0.5rem;
    }

    .skeleton-title {
      width: 70%;
      height: 20px;
      background: rgba(255, 255, 255, 0.1);
    }

    .skeleton-description {
      width: 100%;
      height: 40px;
      background: rgba(255, 255, 255, 0.05);
      margin: 0.5rem 0;
    }

    .skeleton-links {
      display: flex;
      gap: 0.5rem;
    }

    .skeleton-button {
      width: 80px;
      height: 30px;
      background: rgba(255, 255, 255, 0.1);
    }

    @keyframes loading-pulse {
      0% {
        opacity: 0.6;
      }
      50% {
        opacity: 0.3;
      }
      100% {
        opacity: 0.6;
      }
    }

    .skeleton-card > div {
      animation: loading-pulse 1.5s infinite;
    }
  `]
})
export class ProjectSkeletonComponent {
  @Input() count: number = 3;
}