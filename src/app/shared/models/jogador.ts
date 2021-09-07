export class Jogador {
  nome: string;
  saldo: number;
  pontuacaoRodada: number;
  pontuacaoGeral: number;

  constructor(nome: string, saldo: number) {
    this.nome = nome;
    this.saldo = saldo;
    this.pontuacaoRodada = 0;
    this.pontuacaoGeral = 0;
  }
}
