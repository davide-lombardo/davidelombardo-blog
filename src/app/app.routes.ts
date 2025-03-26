import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TagsComponent } from './pages/tags/tags.component';
import { TaggedPostsComponent } from './pages/tagged-posts/tagged-posts.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
  },
  { 
    path: 'about-me', 
    component: AboutMeComponent,
    title: 'About Me - Davide Lombardo Blog'
  },
  { 
    path: 'projects', 
    component: ProjectsComponent,
    title: 'Projects - Davide Lombardo Blog'
  },
  { 
    path: 'posts', 
    component: ArticlesComponent,
    title: 'Posts - Davide Lombardo Blog'
  },
  { 
    path: 'posts/:postSlug', 
    component: PostDetailComponent 
  },
  { 
    path: 'tags', 
    component: TagsComponent,
    title: 'Tags - Davide Lombardo Blog'
  },
  { 
    path: 'tags/:tagSlug', 
    component: TaggedPostsComponent 
  },
  { 
    path: '**', 
    component: NotFoundComponent,
    title: '404 - Page Not Found'
  },
];
