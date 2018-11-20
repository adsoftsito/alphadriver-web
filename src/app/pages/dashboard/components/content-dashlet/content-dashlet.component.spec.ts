import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDashletComponent } from './content-dashlet.component';

describe('ContentDashletComponent', () => {
  let component: ContentDashletComponent;
  let fixture: ComponentFixture<ContentDashletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentDashletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentDashletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
