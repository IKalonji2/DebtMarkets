import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradesDashboardComponent } from './trades-dashboard.component';

describe('TradesDashboardComponent', () => {
  let component: TradesDashboardComponent;
  let fixture: ComponentFixture<TradesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TradesDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TradesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
