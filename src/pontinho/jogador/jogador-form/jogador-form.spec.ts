import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogadorForm } from './jogador-form';

describe('JogadorForm', () => {
  let component: JogadorForm;
  let fixture: ComponentFixture<JogadorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JogadorForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JogadorForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
