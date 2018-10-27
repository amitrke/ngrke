import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WthrwdgitComponent } from './wthrwdgit.component';

describe('WthrwdgitComponent', () => {
  let component: WthrwdgitComponent;
  let fixture: ComponentFixture<WthrwdgitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WthrwdgitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WthrwdgitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
