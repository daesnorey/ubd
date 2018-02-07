import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleMenuComponent } from './module-menu.component';

describe('ModuleMenuComponent', () => {
  let component: ModuleMenuComponent;
  let fixture: ComponentFixture<ModuleMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
