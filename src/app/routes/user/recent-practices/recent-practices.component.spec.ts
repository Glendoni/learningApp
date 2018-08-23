import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPracticesComponent } from './recent-practices.component';

describe('RecentPracticesComponent', () => {
  let component: RecentPracticesComponent;
  let fixture: ComponentFixture<RecentPracticesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentPracticesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPracticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
