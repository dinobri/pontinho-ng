import { PontuacaoJogador } from './pontuacao-jogador';

export class Rodada {
  numero: number;
  vencedorId: string | null;
  pontuacoes: Record<string, PontuacaoJogador>;
  lagrimaColetada: number;
  finalizada: boolean;

  constructor(numero: number, lagrimaColetada: number) {
    this.numero = numero;
    this.vencedorId = null;
    this.pontuacoes = {};
    this.lagrimaColetada = lagrimaColetada;
    this.finalizada = false;
  }
}
