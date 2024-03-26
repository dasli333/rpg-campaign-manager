import {GameSystem} from "../enums/game-system";

export class Campaign {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  gameSystem: GameSystem;
  image?: string;
  endDate?: string;

  constructor(id: string, title: string, startDate: Date, gameSystem: GameSystem) {
    this.id = id;
    this.title = title;
    this.startDate = startDate;
    this.gameSystem = gameSystem;
  }
}
