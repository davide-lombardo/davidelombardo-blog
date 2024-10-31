import { Component, input } from '@angular/core';

@Component({
  selector: 'app-info-panel',
  standalone: true,
  imports: [],
  templateUrl: './info-panel.component.html',
  styleUrl: './info-panel.component.scss'
})
export class InfoPanelComponent {
  title = input.required<string>();
  description = input.required<string[]>();
}
