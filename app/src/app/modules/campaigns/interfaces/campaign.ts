import {GameSystem} from "../enums/game-system";
import {StoryLog} from "../../story-log/interface/story-log";

export interface ICampaign {
  id: string;
  title: string;
  description?: string;
  startDate?: Date;
  gameSystem: GameSystem;
  image?: string;
  imageFile?: File;
  endDate?: string;
  storyLogs: StoryLog[];
}
