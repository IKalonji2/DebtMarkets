import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionAgentDashboardComponent } from './collection-agent-dashboard.component';

describe('CollectionAgentDashboardComponent', () => {
  let component: CollectionAgentDashboardComponent;
  let fixture: ComponentFixture<CollectionAgentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionAgentDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectionAgentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
