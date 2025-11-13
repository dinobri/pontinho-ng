export class PontuacaoJogador {
  jogadorId: string;
  pontos: number;
  estourou?: boolean;

  constructor(jogadorId: string, pontos: number, estourou?: boolean) {
    this.jogadorId = jogadorId;
    this.pontos = pontos;
    this.estourou = estourou;
  }
}
