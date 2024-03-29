import {Schema} from "mongoose";
import {StoryLogSchema} from "./embedded/story-log.schema";
import {PlayerCharacterSchema} from "./embedded/player-character.schema";

export const CampaignSchema = new Schema({
    title: String,
    description: String,
    startDate: {type: Date, default: Date.now},
    gameSystem: String,
    image: String,
    endDate: Date,
    storyLogs: [StoryLogSchema],
    playersCharacters: [PlayerCharacterSchema],
});

CampaignSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
})