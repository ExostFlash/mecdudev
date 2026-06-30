import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAccueilComponent } from './home-accueil.component';

describe('HomeAccueilComponent', () => {
  let component: HomeAccueilComponent;
  let fixture: ComponentFixture<HomeAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeAccueilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
