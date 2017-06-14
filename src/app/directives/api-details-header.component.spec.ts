import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDetailsHeaderComponent } from './api-details-header.component';

describe('ApiDetailsHeaderComponent', () => {
  let component: ApiDetailsHeaderComponent;
  let fixture: ComponentFixture<ApiDetailsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiDetailsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
