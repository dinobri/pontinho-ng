export class ConfiguracaoPartida {
  valorFicha: number; // Em reais
  fichasLagrima: number;
  fichasEstourada: number;


  constructor(valorFicha: number, fichasLagrima: number, fichasEstourada: number) {
    this.valorFicha = valorFicha;
    this.fichasLagrima = fichasLagrima;
    this.fichasEstourada = fichasEstourada;
  }

  static criarConfiguracaoPartidaPadrao(): ConfiguracaoPartida {
    return new ConfiguracaoPartida(1, 1, 2);
  }

  calcularValorLagrima(config: ConfiguracaoPartida): number {
    return config.valorFicha * config.fichasLagrima;

  }
  calcularValorEstourada(config: ConfiguracaoPartida): number {
    return config.valorFicha * config.fichasEstourada;
  }

}
