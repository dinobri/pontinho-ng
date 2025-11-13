import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./componentes/inicio/inicio.component').then((m) => m.InicioComponent),
  },
  {
    path: 'configuracao-partida',
    loadComponent: () =>
      import('./componentes/configuracao-partida/configuracao-partida.component').then(
        (m) => m.ConfiguracaoPartidaComponent
      ),
  },
  {
    path: 'configuracao-jogadores',
    loadComponent: () =>
      import('./componentes/configuracao-jogadores/configuracao-jogadores.component').then(
        (m) => m.ConfiguracaoJogadoresComponent
      ),
  },
  {
    path: 'resumo-configuracao',
    loadComponent: () =>
      import('./componentes/resumo-configuracao/resumo-configuracao.component').then(
        (m) => m.ResumoConfiguracaoComponent
      ),
  },
  {
    path: 'gerenciar-rodada',
    loadComponent: () =>
      import('./componentes/gerenciar-rodada/gerenciar-rodada.component').then(
        (m) => m.GerenciarRodadaComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
