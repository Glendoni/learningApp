import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityOfflineComponent } from './community-offline.component';

describe('CommunityOfflineComponent', () => {
  let component: CommunityOfflineComponent;
  let fixture: ComponentFixture<CommunityOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
