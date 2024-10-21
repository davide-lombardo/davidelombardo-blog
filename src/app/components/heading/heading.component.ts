import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-heading',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.scss'
})
export class HeadingComponent {
  title = input.required<string>(); 
  buttonText = input.required<string>(); 
  description = input<string>(); 
  slug = input<string>(); 
}
