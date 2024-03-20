import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTreeComponent } from './campaign-tree.component';

describe('CampaignTreeComponent', () => {
  let component: CampaignTreeComponent;
  let fixture: ComponentFixture<CampaignTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampaignTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
