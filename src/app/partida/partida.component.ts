import { Jogador } from './../shared/models/jogador';
import { JOGADORES } from './../mock.jogadores';
import { Partida } from './../shared/models/partida';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.scss'],
})
export class PartidaComponent implements OnInit {
  partida!: Partida;

  constructor() {}

  ngOnInit(): void {
    this.partida = {
      valorFicha: 0.1,
      quantidadeFichasLagrima: 1,
      quantidadeFichasEstourada: 2,
      jogadores: JOGADORES,
    };
  }
}
