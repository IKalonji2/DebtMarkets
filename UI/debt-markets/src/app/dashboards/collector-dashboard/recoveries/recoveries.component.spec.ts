import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveriesComponent } from './recoveries.component';

describe('RecoveriesComponent', () => {
  let component: RecoveriesComponent;
  let fixture: ComponentFixture<RecoveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecoveriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecoveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
