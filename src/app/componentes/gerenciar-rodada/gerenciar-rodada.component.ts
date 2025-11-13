import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { PartidaService } from '../../servicos/partida.service';
import { Jogador } from '../../modelo/jogador';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gerenciar-rodada',
  imports: [ButtonModule, CardModule, TableModule, InputNumberModule, DividerModule, TagModule, DialogModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gerenciar-rodada.component.html',
  styles: [`
    .container {
      min-height: 100vh;
      padding: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .header {
      padding: 1rem 1.5rem 0;
    }

    h3, h4 {
      margin: 0;
    }

    .resumo {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.75rem;
      background: var(--surface-50);
      border-radius: var(--border-radius);
    }

    .label {
      font-size: 0.875rem;
      color: var(--text-color-secondary);
    }

    .value {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--primary-color);
    }

    .help-text {
      color: var(--text-color-secondary);
      font-size: 0.875rem;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-weight: 600;
    }

    .rodada-finalizada {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 2rem;
      text-align: center;
    }

    .dialog-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      text-align: center;
    }

    .dialog-content h2 {
      margin: 0;
      color: var(--primary-color);
    }

    .vencedor-info {
      background: var(--surface-50);
      padding: 1rem;
      border-radius: var(--border-radius);
      width: 100%;
    }

    .vencedor-info p {
      margin: 0.5rem 0;
    }

    @media (max-width: 768px) {
      :host ::ng-deep .p-datatable .p-datatable-tbody > tr > td {
        padding: 0.5rem;
        font-size: 0.875rem;
      }

      .resumo {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class GerenciarRodadaComponent {
  private readonly partidaService = new PartidaService();

  protected readonly partida = signal(this.partidaService.partida());
  protected readonly rodadaAtual = signal(this.partidaService.rodadaAtual());

  protected vencedorSelecionado: string | null = null;
  protected pontuacoes: Record<string, number> = {};

  protected vencedorFinal = () => {
    const p = this.partida();
    if (!p || !p.vencedorFinalId) return null;
    return p.jogadores.find(j => j.id === p.vencedorFinalId) || null;
  };

  protected podeFinalizarRodada(): boolean {
    const p = this.partida();
    if (!p || !this.vencedorSelecionado) return false;
    // all non-winner have pontos set
    return p.jogadores.every(j => j.id === this.vencedorSelecionado || (this.pontuacoes[j.id] !== undefined && this.pontuacoes[j.id] >= 0));
  }

  finalizarRodada(): void {
    if (!this.vencedorSelecionado) return;
    this.partidaService.definirVencedor(this.vencedorSelecionado);

    const p = this.partida();
    p?.jogadores.forEach(j => {
      const pts = j.id === this.vencedorSelecionado ? 0 : (this.pontuacoes[j.id] || 0);
      this.partidaService.registrarPontuacao(j.id, pts);
    });

    this.partidaService.finalizarRodada();
    this.vencedorSelecionado = null;
    this.pontuacoes = {};
  }

  proximaRodada(): void {
    this.partidaService.iniciarNovaRodada();
  }

  novaPartida(): void {
    this.partidaService.limparPartida();
    (window as any).location.href = '/';
  }
}
