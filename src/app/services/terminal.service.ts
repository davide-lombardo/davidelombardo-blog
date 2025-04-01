import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TerminalService {
  private isTerminalVisible = signal<boolean>(false);

  get isTerminalVisible$(): Signal<boolean> { 
    return this.isTerminalVisible.asReadonly(); 
  }

  toggleTerminal(): void {
    this.isTerminalVisible.set(!this.isTerminalVisible());
  }
}
