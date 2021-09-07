import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PartidaComponent } from './partida/partida.component';
import { RodadaComponent } from './rodada/rodada.component';

@NgModule({
  declarations: [AppComponent, PartidaComponent, RodadaComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
