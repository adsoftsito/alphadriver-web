import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateadmStatusComponent } from './updateadm-status.component';

describe('UpdateadmStatusComponent', () => {
  let component: UpdateadmStatusComponent;
  let fixture: ComponentFixture<UpdateadmStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateadmStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateadmStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
