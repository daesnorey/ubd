import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesIndicatorComponent } from './sales-indicator.component';

describe('SalesIndicatorComponent', () => {
  let component: SalesIndicatorComponent;
  let fixture: ComponentFixture<SalesIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
