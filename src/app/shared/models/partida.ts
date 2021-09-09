import { Pontuacao } from './pontucao';
import { Rodada } from './rodada';
import { Jogador } from './jogador';
export class Partida {
  valorFicha!: number;
  quantidadeFichasLagrima!: number;
  quantidadeFichasEstourada!: number;
  valorBolao!: number;

  jogadores: Jogador[];
  rodadas: Rodada[];

  constructor() {
    this.jogadores = [];
    this.rodadas = [];
  }

  getValorLagrima(): number {
    return this.quantidadeFichasLagrima * this.valorFicha;
  }

  getValorEstourada(): number {
    return this.quantidadeFichasEstourada * this.valorFicha;
  }

  registrarRodada(): void {
    let jogadoresComZero: Jogador[] = this.jogadores.filter(
      (j) => j.pontuacaoRodada === 0
    );

    if (jogadoresComZero.length === 1) {
      let novaRodada = new Rodada();
      novaRodada.ordem = this.rodadas.length + 1;
      novaRodada.vencedor = jogadoresComZero[0];
      novaRodada.pontuacoes = this.jogadores.map((j) => {
        let p = new Pontuacao();
        p.jogador = j;
        p.valor = j.pontuacaoRodada;
        return p;
      });

      this.rodadas.push(novaRodada);
    } else {
      //TODO: lançar exceção
      console.error('Não foi possível definir o vencedor da rodada.');
    }
  }
}
