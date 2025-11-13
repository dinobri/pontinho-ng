import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-inicio',
  imports: [ButtonModule, CardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <p-card>
        <div class="content">
          <h1>Pontinho</h1>
          <p class="subtitle">Controle de pontuação digital</p>
          <p-button
            label="Iniciar Nova Partida"
            icon="pi pi-play"
            (onClick)="iniciarNovaPartida()"
            [style]="{ width: '100%' }"
          />
        </div>
      </p-card>
    </div>
  `,
  // styles: [\`
  //   .container{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:1rem}
  //   .content{text-align:center;padding:2rem}
  //   h1{margin:0 0 .5rem 0}
  //   .subtitle{margin:0 0 1.5rem 0;color:var(--text-color-secondary)}
  // \`],
})
export class InicioComponent {
  private readonly router = Router;

  iniciarNovaPartida(): void {
    const r = (Router as any).prototype ? (Router as any) : null;
    // Use navigation via inject at runtime to avoid constructor injection
    // Simpler: use window.location for now if inject not available in template context
    (window as any).location.href = '/configuracao-partida';
  }
}
