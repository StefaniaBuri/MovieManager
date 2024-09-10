import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroPagePage } from './intro-page.page';

describe('IntroPagePage', () => {
  let component: IntroPagePage;
  let fixture: ComponentFixture<IntroPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
