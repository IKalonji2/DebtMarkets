import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveBidsComponent } from './active-bids.component';

describe('ActiveBidsComponent', () => {
  let component: ActiveBidsComponent;
  let fixture: ComponentFixture<ActiveBidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveBidsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
