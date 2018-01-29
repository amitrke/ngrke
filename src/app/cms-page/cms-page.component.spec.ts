import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsPageComponent } from './cms-page.component';

describe('CmsPageComponent', () => {
  let component: CmsPageComponent;
  let fixture: ComponentFixture<CmsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
