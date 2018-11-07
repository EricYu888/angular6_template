import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppListenerComponent } from './app-listener.component';

describe('AppListenerComponent', () => {
  let component: AppListenerComponent;
  let fixture: ComponentFixture<AppListenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppListenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
