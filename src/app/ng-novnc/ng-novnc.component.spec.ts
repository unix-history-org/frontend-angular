import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgNovncComponent } from './ng-novnc.component';

describe('NgNovncComponent', () => {
  let component: NgNovncComponent;
  let fixture: ComponentFixture<NgNovncComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgNovncComponent]
    });
    fixture = TestBed.createComponent(NgNovncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
