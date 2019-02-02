import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnfdlgComponent } from './cnfdlg.component';

describe('CnfdlgComponent', () => {
  let component: CnfdlgComponent;
  let fixture: ComponentFixture<CnfdlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnfdlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnfdlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
