import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { PartidaService } from '../../servicos/partida.service';
import { ConfiguracaoPartida } from '../../modelo/configuracao-partida';
import { Jogador } from '../../modelo/jogador';

@Component({
  selector: 'app-resumo-configuracao',
  imports: [ButtonModule, CardModule, TableModule, DividerModule, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './resumo-configuracao.component.html'
  // styles: [\`
  //   .container{padding:1rem}
  //   .footer{display:flex;justify-content:space-between;margin-top:1rem}
  // \`],
})
export class ResumoConfiguracaoComponent {
  private readonly partidaService = new PartidaService();

  protected configuracao: ConfiguracaoPartida | undefined = (history.state && (history.state.configuracao as ConfiguracaoPartida)) || undefined;
  protected jogadores: Jogador[] = (history.state && (history.state.jogadores as Jogador[])) || [];

  voltar(): void {
    (window as any).location.href = '/configuracao-jogadores';
  }

  iniciarPartida(): void {
    if (!this.configuracao || this.jogadores.length < 2) return;
    this.partidaService.novaPartida(this.configuracao, this.jogadores);
    this.partidaService.iniciarPartida();
    (window as any).location.href = '/gerenciar-rodada';
  }
}
