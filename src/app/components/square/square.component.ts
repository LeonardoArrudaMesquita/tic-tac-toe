import { Component, Input } from '@angular/core';
import { Player } from '../game/game.component';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [],
  templateUrl: './square.component.html',
  styleUrl: './square.component.scss'
})
export class SquareComponent {
  @Input() value: Player | null = null;  
}
