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
  // styles: [\`
  //   .container{padding:1rem;display:flex;flex-direction:column;gap:1rem}
  // \`],
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
