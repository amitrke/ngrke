import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoglryComponent } from './photoglry.component';

describe('PhotoglryComponent', () => {
  let component: PhotoglryComponent;
  let fixture: ComponentFixture<PhotoglryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoglryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoglryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
