import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateoperStatusComponent } from './updateoper-status.component';

describe('UpdateoperStatusComponent', () => {
  let component: UpdateoperStatusComponent;
  let fixture: ComponentFixture<UpdateoperStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateoperStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateoperStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
