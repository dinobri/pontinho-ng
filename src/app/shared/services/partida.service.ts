import { JOGADORES } from './../../mock.jogadores';
import { Partida } from './../models/partida';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PartidaService {
  private partida!: Partida;

  constructor() {
    this.partida = {
      valorFicha: 0.1,
      quantidadeFichasLagrima: 1,
      quantidadeFichasEstourada: 2,
      jogadores: JOGADORES,
    };
  }

  getPartida(): Partida {
    return this.partida;
  }

  iniciarPartida(): void {
    // desabilita campos
    // coletar estourada
  }

  encerrarPartida(): void {
    // redistribuir lágrimas
    // atribuir o prêmio
  }
}
