import { ConfiguracaoPartida } from './configuracao-partida';
import { Jogador } from './jogador';
import { Rodada } from './rodada';

export class Partida {
  id: string;
  configuracao: ConfiguracaoPartida;
  jogadores: Jogador[];
  rodadas: Rodada[];
  poteEstouradas: number;
  iniciada: boolean;
  finalizada: boolean;
  vencedorFinalId: string | null;

  constructor(configuracao: ConfiguracaoPartida, jogadores: Jogador[]) {
    this.id = crypto.randomUUID();
    this.configuracao = configuracao;
    this.jogadores = jogadores.map(j => new Jogador(j.nome, j.saldo));
    this.rodadas = [];
    this.poteEstouradas = 0;
    this.iniciada = false;
    this.finalizada = false;
    this.vencedorFinalId = null;
  }
}
