import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip, TooltipPosition} from "@angular/material/tooltip";

@Component({
  selector: 'app-info-tooltip',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './info-tooltip.component.html',
  styleUrl: './info-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoTooltipComponent {

  @Input({required: true}) tooltipText: string | undefined;
  @Input() tooltipPosition: TooltipPosition = 'right'
}
