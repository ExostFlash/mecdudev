import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetAccueilComponent } from './projet-accueil.component';

describe('ProjetAccueilComponent', () => {
  let component: ProjetAccueilComponent;
  let fixture: ComponentFixture<ProjetAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjetAccueilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
