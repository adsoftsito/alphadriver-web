import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDetailRouteComponent } from './table-detail-route.component';

describe('TableDetailRouteComponent', () => {
  let component: TableDetailRouteComponent;
  let fixture: ComponentFixture<TableDetailRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDetailRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDetailRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
