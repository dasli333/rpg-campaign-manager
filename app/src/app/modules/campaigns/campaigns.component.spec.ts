import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsComponent } from './campaigns.component';

describe('CampaignsComponent', () => {
  let component: CampaignsComponent;
  let fixture: ComponentFixture<CampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
