import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-campaign-selector',
  standalone: true,
  imports: [],
  templateUrl: './campaign-selector.component.html',
  styleUrl: './campaign-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignSelectorComponent {

}
