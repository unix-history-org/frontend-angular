import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsTermComponent } from './os-term.component';

describe('OsTermComponent', () => {
  let component: OsTermComponent;
  let fixture: ComponentFixture<OsTermComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OsTermComponent]
    });
    fixture = TestBed.createComponent(OsTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
