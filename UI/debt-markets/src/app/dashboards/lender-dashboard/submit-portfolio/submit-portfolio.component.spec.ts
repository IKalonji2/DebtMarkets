import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitPortfolioComponent } from './submit-portfolio.component';

describe('SubmitPortfolioComponent', () => {
  let component: SubmitPortfolioComponent;
  let fixture: ComponentFixture<SubmitPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmitPortfolioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
