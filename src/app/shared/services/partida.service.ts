import { Injectable } from '@angular/core';
import { JOGADORES } from './../../mock.jogadores';
import { Pontuacao } from './../models/pontucao';
import { Rodada } from './../models/rodada';
import { Partida } from './../models/partida';
import { Jogador } from '../models/jogador';

@Injectable({
  providedIn: 'root',
})
export class PartidaService {
  private partida!: Partida;

  constructor() {
    this.inicializarPartidaPadrao();
  }

  getPartida(): Partida {
    return this.partida;
  }

  iniciarPartida(): void {
    this.coletarEstouradas(this.partida.jogadores);
    this.iniciarNovaRodada();
  }

  iniciarNovaRodada(): void {
    this.coletarLagrimas();
  }

  encerrarRodada(): void {
    // 1 - validar fim da rodada
    let jogadoresComZero: Jogador[] = this.partida.jogadores.filter(
      (j) => j.pontuacaoRodada === 0
    );

    if (jogadoresComZero.length < 1 || jogadoresComZero.length > 1) {
      console.error('Não foi possível definir o vencedor da rodada.');
      //TODO: lançar exceção
      return;
    }

    // 2 - definir vencedor
    let vencedor = jogadoresComZero[0];

    // 3 - registrar rodada
    let novaRodada = new Rodada();
    novaRodada.ordem = this.partida.rodadas.length + 1;
    novaRodada.vencedor = vencedor;
    novaRodada.pontuacoes = this.partida.jogadores.map((j) => {
      let p = new Pontuacao();
      p.jogador = j;
      p.valor = j.pontuacaoRodada;
      return p;
    });

    this.partida.rodadas.push(novaRodada);

    // somar pontuações
    this.somarPontucoesDaRodada();

    // identificar estourados
    let estourados = this.buscarEstourados();

    // cerifica se chegou ao fim do jogo
    if (estourados.length === this.partida.jogadores.length - 1) {
      this.encerrarPartida();

      return;
    }

    // tratar pontuação dos estourados
    this.tratarEstourados(estourados);

    // entregar lágrima para o vencedor
    vencedor.incrementarSaldo(
      this.partida.getValorLagrima() * this.partida.jogadores.length
    );
    console.log(
      `O jogador ${vencedor.nome} ganhou \$ ${
        this.partida.getValorLagrima() * this.partida.jogadores.length
      }.`
    );


    // iniciar nova rodada
    this.iniciarNovaRodada();
  }

  encerrarPartida(): void {
    // TODO
    // redistribuir lágrimas
    // atribuir o prêmio
  }

  /**
   * Métodos privados
   */

  private inicializarPartidaPadrao() {
    this.partida = new Partida();
    this.partida.valorFicha = 0.1;
    this.partida.quantidadeFichasLagrima = 1;
    this.partida.quantidadeFichasEstourada = 2;
    this.partida.jogadores = JOGADORES;
    this.partida.valorBolao = 0;
  }

  private coletarLagrimas(): void {
    this.partida.jogadores.forEach((j) => {
      j.decrementarSaldo(this.partida.getValorLagrima());
    });
  }

  private coletarEstouradas(jogadores: Jogador[]): void {
    jogadores.forEach((j) => {
      j.decrementarSaldo(this.partida.getValorEstourada());
      this.partida.valorBolao += this.partida.quantidadeFichasEstourada;
    });
  }

  private buscarEstourados(): Jogador[] {
    return this.partida.jogadores.filter((j) => j.pontuacaoGeral >= 100);
  }

  private somarPontucoesDaRodada(): void {
    this.partida.jogadores.forEach((j) => j.incrementarPontucaoRodada());
  }

  private tratarEstourados(estourados: Jogador[]): void {
    //verifica e atribui maior pontuação abaixo de 100
    let maiorPontuacaoValida = this.partida.jogadores
      .filter((j) => j.pontuacaoGeral < 100)
      .reduce((anterior, atual) =>
        anterior.pontuacaoGeral > atual.pontuacaoGeral ? anterior : atual
      ).pontuacaoGeral;

    estourados.forEach((j) => (j.pontuacaoGeral = maiorPontuacaoValida));

    // coleta estourada
    this.coletarEstouradas(estourados);

    // informa quem estourou
    console.log(estourados);
  }
}
