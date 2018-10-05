import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpicsComponent } from './listpics.component';

describe('ListpicsComponent', () => {
  let component: ListpicsComponent;
  let fixture: ComponentFixture<ListpicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
