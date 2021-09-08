import { PartidaService } from './../shared/services/partida.service';
import { Jogador } from './../shared/models/jogador';
import { JOGADORES } from './../mock.jogadores';
import { Partida } from './../shared/models/partida';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.scss'],
})
export class PartidaComponent implements OnInit {
  partida!: Partida;

  constructor(private partidaService: PartidaService) {}

  ngOnInit(): void {
    this.partida = this.partidaService.getPartida();
  }
}
