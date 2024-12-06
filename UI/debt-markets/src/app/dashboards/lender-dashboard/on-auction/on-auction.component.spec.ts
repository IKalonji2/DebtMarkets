import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnAuctionComponent } from './on-auction.component';

describe('OnAuctionComponent', () => {
  let component: OnAuctionComponent;
  let fixture: ComponentFixture<OnAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnAuctionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
