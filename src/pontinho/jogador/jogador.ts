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

  incrementarSaldo(valor: number): void {
    this.saldo += valor;
  }

  decrementarSaldo(valor: number): void {
    this.saldo -= valor;
  }

  incrementarPontucaoRodada(): void {
    this.pontuacaoGeral += this.pontuacaoRodada;
    this.pontuacaoRodada = 0;
  }
}
