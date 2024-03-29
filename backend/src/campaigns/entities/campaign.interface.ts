import {StoryLog} from "./embedded/story-log.interface";
import {PlayerCharacter} from "./embedded/player-character.interface";


export interface Campaign extends Document {
    id: number;
    title: string;
    description?: string;
    startDate: Date;
    gameSystem: string;
    image?: string;
    endDate?: string;
    storyLogs: StoryLog[];
    playersCharacters: PlayerCharacter[];
}
