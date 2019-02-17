import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ph2DataComponent } from './ph2data.component';

describe('Ph2dataComponent', () => {
  let component: Ph2DataComponent;
  let fixture: ComponentFixture<Ph2DataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ph2DataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ph2DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
