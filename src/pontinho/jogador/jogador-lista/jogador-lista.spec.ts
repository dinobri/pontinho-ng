import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogadorLista } from './jogador-lista';

describe('JogadorLista', () => {
  let component: JogadorLista;
  let fixture: ComponentFixture<JogadorLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JogadorLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JogadorLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
