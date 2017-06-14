import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionDetectionVideoComponent } from './emotion-detection-video.component';

describe('EmotionDetectionVideoComponent', () => {
  let component: EmotionDetectionVideoComponent;
  let fixture: ComponentFixture<EmotionDetectionVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionDetectionVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionDetectionVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
