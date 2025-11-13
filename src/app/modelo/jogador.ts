export class Jogador {
  id: string;
  nome: string;
  saldo: number;
  pontuacaoRodada: number;
  pontuacaoGeral: number;
  estourou: boolean;

  constructor(nome: string, saldo: number) {
    this.id = crypto.randomUUID();
    this.nome = nome;
    this.saldo = saldo;
    this.pontuacaoRodada = 0;
    this.pontuacaoGeral = 0;
    this.estourou = false;
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
