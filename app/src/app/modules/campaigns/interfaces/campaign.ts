import {GameSystem} from "../enums/game-system";
import {StoryLog} from "../../story-log/interface/story-log";
import {IPlayerCharacter} from "../../players-characters/interfaces/player-character";

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
  playersCharacters: IPlayerCharacter[];
}
