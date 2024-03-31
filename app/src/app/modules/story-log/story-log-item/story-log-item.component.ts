import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {StoryLog} from "../interface/story-log";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-story-log-item',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './story-log-item.component.html',
  styleUrl: './story-log-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoryLogItemComponent {

  @Input({required: true}) storyLog: StoryLog | undefined;
}
