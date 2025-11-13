import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { ConfiguracaoPartida } from '../../modelo/configuracao-partida';
import { Jogador } from '../../modelo/jogador';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-configuracao-jogadores',
  imports: [ButtonModule, CardModule, InputTextModule, InputNumberModule, TableModule, FormsModule, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './configuracao-jogadores.component.html',
  styles: [`
    .container{padding:1rem}
    .add{display:flex;gap:.5rem;margin-bottom:1rem}
    .footer{display:flex;justify-content:space-between;margin-top:1rem}
  `],
})
export class ConfiguracaoJogadoresComponent {
  protected configuracao?: ConfiguracaoPartida = (history.state && (history.state.configuracao as ConfiguracaoPartida)) || undefined;
  protected readonly jogadores = signal<Jogador[]>([]);
  protected nomeNovoJogador = '';
  protected saldoInicialNovoJogador = 100;

  adicionarJogador(): void {
    if (!this.nomeNovoJogador.trim()) return;
    const novo = new Jogador(this.nomeNovoJogador.trim(), this.saldoInicialNovoJogador);
    this.jogadores.update(v => [...v, novo]);
    this.nomeNovoJogador = '';
    this.saldoInicialNovoJogador = 100;
  }

  removerJogador(id: string): void {
    this.jogadores.update(v => v.filter(j => j.id !== id));
  }

  voltar(): void {
    (window as any).location.href = '/configuracao-partida';
  }

  proximo(): void {
    history.replaceState({ configuracao: this.configuracao, jogadores: this.jogadores() }, '');
    (window as any).location.href = '/resumo-configuracao';
  }
}
