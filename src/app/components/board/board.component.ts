import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SquareComponent } from '../square/square.component';
import { Player } from '../game/game.component';

interface Board {
  row: number;
  col: number;
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [SquareComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  @Input() board: Player[][] | null = null;
  @Output() move = new EventEmitter<Board>();

  trackByIndex(index: number, item: any): number {
    return index;
  }

  handleSquare(row: number, col: number) {
    this.move.emit({ row, col });  
  }  
}
