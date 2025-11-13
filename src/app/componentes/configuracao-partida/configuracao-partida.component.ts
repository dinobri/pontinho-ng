import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfiguracaoPartida } from '../../modelo/configuracao-partida';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-configuracao-partida',
  imports: [ButtonModule, CardModule, InputNumberModule, FormsModule, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './configuracao-partida.component.html',
  styles: [`
    .container{padding:1rem;min-height:100vh}
    .form{display:flex;flex-direction:column;gap:1rem}
    .footer{display:flex;justify-content:space-between;margin-top:1rem}
  `],
})
export class ConfiguracaoPartidaComponent {
  protected readonly configuracao = signal<ConfiguracaoPartida>(ConfiguracaoPartida.criarConfiguracaoPartidaPadrao());

  voltar(): void {
    (window as any).location.href = '/';
  }
  proximo(): void {
    history.replaceState({ configuracao: this.configuracao() }, '');
    (window as any).location.href = '/configuracao-jogadores';
  }
}
