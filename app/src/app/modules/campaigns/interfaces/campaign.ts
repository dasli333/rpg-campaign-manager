import {GameSystem} from "../enums/game-system";

export interface Campaign {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  gameSystem: GameSystem;
  image?: string;
  endDate?: string;
}
