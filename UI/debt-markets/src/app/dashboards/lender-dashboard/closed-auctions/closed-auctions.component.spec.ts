import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedAuctionsComponent } from './closed-auctions.component';

describe('ClosedAuctionsComponent', () => {
  let component: ClosedAuctionsComponent;
  let fixture: ComponentFixture<ClosedAuctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClosedAuctionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClosedAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
