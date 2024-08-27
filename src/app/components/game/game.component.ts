import { Component } from '@angular/core';
import { BoardComponent } from '../board/board.component';

export type Player = 'X' | 'O';
type Winner = 'Pending' | 'Tie' | 'X' | 'O';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [BoardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  currentPlayer: Player = 'X';
  winner: Winner = 'Pending';
  board: Player[][] = Array(3).fill(null).map(() => Array(3).fill(null));
  
  handleMove(row: number, col: number) {
    if (!this.board[row][col] && this.winner === 'Pending') {
      this.board[row][col] = this.currentPlayer;

      this.updateMatchStatus();
    }
  }

  resetMatch() {
    this.board = Array(3).fill(null).map(() => Array(3).fill(null));
    this.winner = 'Pending';
    this.currentPlayer = 'X';
  }

  updateMatchStatus() {
    this.winner = this.checkWinner() ? this.currentPlayer : this.checkTie() ? 'Tie' : 'Pending';

    this.switchPlayer();
  }
  
  private switchPlayer() {    
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  private checkWinner(): boolean {    
    const linesToWin = [
      // Rows
      [this.board[0][0], this.board[0][1], this.board[0][2]],
      [this.board[1][0], this.board[1][1], this.board[1][2]],
      [this.board[2][0], this.board[2][1], this.board[2][2]],
      // Columns
      [this.board[0][0], this.board[1][0], this.board[2][0]],
      [this.board[0][1], this.board[1][1], this.board[2][1]],
      [this.board[0][2], this.board[1][2], this.board[2][2]],
      // Diagonals
      [this.board[0][0], this.board[1][1], this.board[2][2]],
      [this.board[0][2], this.board[1][1], this.board[2][0]],
    ];
    
    return linesToWin.some(line => line.every(cell => cell === this.currentPlayer));
  }

  private checkTie() {
    return this.board.every(line => line.every(cell => !!cell));
  }  
}
