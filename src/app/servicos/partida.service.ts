import { Injectable, signal, computed } from '@angular/core';
import { Partida } from '../modelo/partida';
import { ConfiguracaoPartida } from '../modelo/configuracao-partida';
import { Jogador } from '../modelo/jogador';
import { Rodada } from '../modelo/rodada';
import { PontuacaoJogador } from '../modelo/pontuacao-jogador';

@Injectable({
  providedIn: 'root',
})
export class PartidaService {
  private readonly partidaAtual = signal<Partida | null>(null);

  readonly partida = this.partidaAtual.asReadonly();
  readonly temPartidaAtiva = computed(() => this.partidaAtual() !== null);
  readonly rodadaAtual = computed(() => {
    const p = this.partidaAtual();
    if (!p || p.rodadas.length === 0) return null;
    return p.rodadas[p.rodadas.length - 1];
  });

  novaPartida(configuracao: ConfiguracaoPartida, jogadores: Jogador[]): void {
    const partida = new Partida(configuracao, jogadores);
    this.partidaAtual.set(partida);
  }

  iniciarPartida(): void {
    this.partidaAtual.update((p) => {
      if (!p) return p;
      return { ...p, iniciada: true };
    });
    this.iniciarNovaRodada();
  }

  iniciarNovaRodada(): void {
    // this.partidaAtual.update((p) => {
    //   if (!p) return p;

    //   const numeroRodada = p.rodadas.length + 1;
    //   const lagrimaTotal = p.configuracao.fichasLagrima * p.jogadores.length;

    //   const jogadoresAtualizados = p.jogadores.map((j) => ({
    //     ...j,
    //     saldo: j.saldo - p.configuracao.fichasLagrima,
    //   }));

    //   const novaRodada = new Rodada(numeroRodada, lagrimaTotal);

    //   return { ...p, jogadores: jogadoresAtualizados, rodadas: [...p.rodadas, novaRodada] };
    // });
  }

  registrarPontuacao(jogadorId: string, pontos: number): void {
    this.partidaAtual.update((p) => {
      if (!p) return p;
      const rodada = p.rodadas[p.rodadas.length - 1];
      if (!rodada || rodada.finalizada) return p;
      const pj: PontuacaoJogador = { jogadorId, pontos, estourou: false };
      rodada.pontuacoes = { ...rodada.pontuacoes, [jogadorId]: pj };
      return { ...p };
    });
  }

  definirVencedor(jogadorId: string): void {
    this.partidaAtual.update((p) => {
      if (!p) return p;
      const rodada = p.rodadas[p.rodadas.length - 1];
      if (!rodada) return p;
      rodada.vencedorId = jogadorId;
      return { ...p };
    });
  }

  finalizarRodada(): void {
    // this.partidaAtual.update((p) => {
    //   if (!p) return p;
    //   const rodada = p.rodadas[p.rodadas.length - 1];
    //   if (!rodada || !rodada.vencedorId) return p;

    //   rodada.finalizada = true;

    //   // Atualizar pontuacao total e checar estouradas
    //   let jogadoresAtualizados = p.jogadores.map((j) => {
    //     const pj = rodada.pontuacoes[j.id];
    //     const pontos = pj ? pj.pontos : 0;
    //     const novaPontuacao = j.pontuacaoGeral + pontos;
    //     const estourou = novaPontuacao >= 100;
    //     return { ...j, pontuacaoGeral: novaPontuacao, estourou };
    //   });

    //   // Identificar quem estourou nesta rodada (novas estouradas)
    //   const estouraramAgora = jogadoresAtualizados.filter(j => j.estourou);

    //   let novoPoteEstouradas = p.poteEstouradas;

    //   if (estouraramAgora.length > 0) {
    //     // Cobrar estourada de cada um que estourou
    //     jogadoresAtualizados = jogadoresAtualizados.map(j => {
    //       if (j.estourou) {
    //         novoPoteEstouradas += p.configuracao.fichasEstourada;
    //         return { ...j, saldo: j.saldo - p.configuracao.fichasEstourada };
    //       }
    //       return j;
    //     });

    //     // Ajustar pontuação de quem estourou para o maior não estourado
    //     const maiorNaoEstourado = jogadoresAtualizados.filter(j => !j.estourou)
    //       .reduce((max, cur) => (cur.pontuacaoGeral > max ? cur.pontuacaoGeral : max), 0);

    //     jogadoresAtualizados = jogadoresAtualizados.map(j => {
    //       if (j.estourou) {
    //         return { ...j, pontuacaoGeral: maiorNaoEstourado };
    //       }
    //       return j;
    //     });
    //   }

    //   // Premiar vencedor com a lágrima (lagrimaColetada)
    //   jogadoresAtualizados = jogadoresAtualizados.map(j => {
    //     if (j.id === rodada.vencedorId) {
    //       return { ...j, saldo: j.saldo + rodada.lagrimaColetada };
    //     }
    //     return j;
    //   });

    //   // Checar término da partida: vencedor e todos os outros estourados
    //   const todosExcetoVencedorEstourados = jogadoresAtualizados
    //     .filter(j => j.id !== rodada.vencedorId)
    //     .every(j => j.estourou);

    //   let finalizada = false;
    //   let vencedorFinalId: string | null = null;

    //   if (todosExcetoVencedorEstourados) {
    //     finalizada = true;
    //     vencedorFinalId = rodada.vencedorId;

    //     // Premiar vencedor com pote de estouradas
    //     jogadoresAtualizados = jogadoresAtualizados.map(j => {
    //       if (j.id === vencedorFinalId) {
    //         return { ...j, saldo: j.saldo + novoPoteEstouradas };
    //       }
    //       // devolver a lágrima (cada um recebe a ficha da lágrima de volta)
    //       return { ...j, saldo: j.saldo + p.configuracao.fichasLagrima };
    //     });

    //     novoPoteEstouradas = 0;
    //   }

    //   return {
    //     ...p,
    //     jogadores: jogadoresAtualizados,
    //     poteEstouradas: novoPoteEstouradas,
    //     finalizada,
    //     vencedorFinalId,
    //   };
    // });
  }

  limparPartida(): void {
    this.partidaAtual.set(null);
  }
}
