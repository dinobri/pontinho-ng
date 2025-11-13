import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'pontinho-root',
  imports: [RouterOutlet, ButtonModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class PontinhoApp {
  protected readonly title = signal('pontinho-ng');
}
