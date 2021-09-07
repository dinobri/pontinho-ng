import { Jogador } from './../shared/models/jogador';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rodada',
  templateUrl: './rodada.component.html',
  styleUrls: ['./rodada.component.scss'],
})
export class RodadaComponent implements OnInit {
  @Input()
  jogadores?: Jogador[];
  constructor() {}

  ngOnInit(): void {}

  alterarPontuacaoRodada(jogador: Jogador, valor: number): void {
    if (jogador.pontuacaoRodada + valor >= 0) {
      jogador.pontuacaoRodada += valor;
    } else {
      jogador.pontuacaoRodada = 0;
    }
  }
}
