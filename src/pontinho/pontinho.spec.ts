import { TestBed } from '@angular/core/testing';
import { PontinhoApp } from './pontinho';

describe('PontinhoNgApp', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PontinhoApp],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PontinhoApp);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(PontinhoApp);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pontinho-ng');
  });
});
