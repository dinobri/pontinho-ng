import { Pontuacao } from './pontucao';
import { Jogador } from './jogador';
export class Rodada {
  ordem!: number;
  vencedor!: Jogador;
  pontuacoes!: Pontuacao[];

  constructor() {}
}
