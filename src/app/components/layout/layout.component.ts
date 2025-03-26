import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavigationComponent } from "../navigation/navigation.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [FooterComponent, NavigationComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {}
