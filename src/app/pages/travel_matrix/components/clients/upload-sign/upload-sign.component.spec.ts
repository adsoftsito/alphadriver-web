import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSignComponent } from './upload-sign.component';

describe('UploadSignComponent', () => {
  let component: UploadSignComponent;
  let fixture: ComponentFixture<UploadSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
