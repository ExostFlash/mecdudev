import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCordoComponent } from './contact-cordo.component';

describe('ContactCordoComponent', () => {
  let component: ContactCordoComponent;
  let fixture: ComponentFixture<ContactCordoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactCordoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactCordoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
