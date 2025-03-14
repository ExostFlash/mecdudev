import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAccueilComponent } from './contact-accueil.component';

describe('ContactAccueilComponent', () => {
  let component: ContactAccueilComponent;
  let fixture: ComponentFixture<ContactAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactAccueilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
