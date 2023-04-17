import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallerUnoComponent } from './taller-uno.component';

describe('TallerUnoComponent', () => {
  let component: TallerUnoComponent;
  let fixture: ComponentFixture<TallerUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TallerUnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TallerUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
