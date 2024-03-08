import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignsComponent {

  constructor() {}
}
