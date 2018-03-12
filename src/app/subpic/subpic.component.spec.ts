import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpicComponent } from './subpic.component';

describe('SubpicComponent', () => {
  let component: SubpicComponent;
  let fixture: ComponentFixture<SubpicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubpicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
