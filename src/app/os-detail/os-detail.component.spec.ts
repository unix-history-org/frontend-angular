import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsDetailComponent } from './os-detail.component';

describe('OsDetailComponent', () => {
  let component: OsDetailComponent;
  let fixture: ComponentFixture<OsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OsDetailComponent]
    });
    fixture = TestBed.createComponent(OsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
