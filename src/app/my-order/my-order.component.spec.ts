import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrderComponent } from './my-order.component';

describe('MyOrdersComponent', () => {
  let component: MyOrderComponent;
  let fixture: ComponentFixture<MyOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
