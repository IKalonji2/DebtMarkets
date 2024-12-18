import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenizeModalComponent } from './tokenize-modal.component';

describe('TokenizeModalComponent', () => {
  let component: TokenizeModalComponent;
  let fixture: ComponentFixture<TokenizeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TokenizeModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TokenizeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
