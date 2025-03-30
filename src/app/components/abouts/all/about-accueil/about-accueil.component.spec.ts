import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAccueilComponent } from './about-accueil.component';

describe('AboutAccueilComponent', () => {
  let component: AboutAccueilComponent;
  let fixture: ComponentFixture<AboutAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutAccueilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
