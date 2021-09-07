import { Rodada } from './rodada';
import { Jogador } from './jogador';
export class Partida {
  valorFicha!: number;
  quantidadeFichasLagrima!: number;
  quantidadeFichasEstourada!: number;
  valorBolao!: number;

  jogadores!: Jogador[];
  rodadas!: Rodada[];

  constructor() {}
}
