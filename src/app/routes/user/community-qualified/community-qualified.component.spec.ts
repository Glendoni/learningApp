import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityQualifiedComponent } from './community-qualified.component';

describe('CommunityQualifiedComponent', () => {
  let component: CommunityQualifiedComponent;
  let fixture: ComponentFixture<CommunityQualifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityQualifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityQualifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
