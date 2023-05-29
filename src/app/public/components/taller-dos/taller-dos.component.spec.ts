import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallerDosComponent } from './taller-dos.component';

describe('TallerDosComponent', () => {
  let component: TallerDosComponent;
  let fixture: ComponentFixture<TallerDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TallerDosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TallerDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
