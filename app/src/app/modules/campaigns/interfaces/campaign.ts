import {GameSystem} from "../enums/game-system";

export interface ICampaign {
  id: string;
  title: string;
  description?: string;
  startDate?: Date;
  gameSystem: GameSystem;
  image?: string;
  imageFile?: File;
  endDate?: string;
}
