import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaArranqueComponent } from './tarea-arranque.component';

describe('TareaArranqueComponent', () => {
  let component: TareaArranqueComponent;
  let fixture: ComponentFixture<TareaArranqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareaArranqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaArranqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
