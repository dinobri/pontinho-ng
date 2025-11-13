import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'pontinho-root',
  imports: [RouterOutlet],
  templateUrl: './pontinho.html',
  styleUrl: './pontinho.scss'
})
export class PontinhoApp {
  protected readonly title = signal('pontinho-ng');
}
