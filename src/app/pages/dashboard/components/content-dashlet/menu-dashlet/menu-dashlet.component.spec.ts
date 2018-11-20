import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDashletComponent } from './menu-dashlet.component';

describe('MenuDashletComponent', () => {
  let component: MenuDashletComponent;
  let fixture: ComponentFixture<MenuDashletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDashletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDashletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
