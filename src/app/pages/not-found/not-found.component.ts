import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ContainerComponent } from "../../components/container/container.component";


@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [HeroComponent, ContainerComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
}
