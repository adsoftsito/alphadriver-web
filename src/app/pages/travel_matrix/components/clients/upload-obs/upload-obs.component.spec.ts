import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadObsComponent } from './upload-obs.component';

describe('UploadObsComponent', () => {
  let component: UploadObsComponent;
  let fixture: ComponentFixture<UploadObsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadObsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadObsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
