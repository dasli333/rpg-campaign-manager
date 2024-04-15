import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ContentComponent} from "./layout/content/content.component";
import {HeaderComponent} from "./layout/header/header.component";
import {Dnd5eApiService} from "./data-services/dnd5e-api.service";
import {PlayerCharacterDataService} from "./modules/players-characters/player-character-data.service";
import {shareReplay} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContentComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'app';
  #dnd5eApiService = inject(Dnd5eApiService);
  #playerCharacterDaraService = inject(PlayerCharacterDataService);

  ngOnInit() {
    this.#dnd5eApiService.getTraits().pipe(
      shareReplay(1)
    ).subscribe(traits => {
      this.#playerCharacterDaraService.setTraits(traits.data.traits);
    });
  }
}
