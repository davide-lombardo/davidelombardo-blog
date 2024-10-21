import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  highlight = input<number>(); 
  subTitle = input<string>(); 
  title = input<string>(); 
  description = input<string>(); 
  index = input<boolean>(); 
  children = input<any>();
  hasLink = input<boolean>(false);
}